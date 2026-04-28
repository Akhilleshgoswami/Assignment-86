import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";

describe("RWA Tokenisation Flow (TypeScript)", function () {
  let token: Contract;
  let treasury: Contract;

  let owner: Signer;
  let user: Signer;
  let other: Signer;

  const RATE = 100;

  beforeEach(async () => {
    [owner, user, other] = await ethers.getSigners();

    // Deploy Token
    const Token = await ethers.getContractFactory("RWAToken");
    token = await Token.deploy(await owner.getAddress());

    // Deploy Treasury
    const Treasury = await ethers.getContractFactory("Treasury");
    treasury = await Treasury.deploy(
      token.target,
      RATE,
      await owner.getAddress()
    );

    // Grant MINTER_ROLE to Treasury
    const MINTER_ROLE = await token.MINTER_ROLE();
    await token.grantRole(MINTER_ROLE, treasury.target);
  });

  // -------------------------------
  // Deposit Flow
  // -------------------------------
  it("should mint correct tokens on deposit", async () => {
    await treasury.connect(user).deposit({
      value: ethers.parseEther("1"),
    });

    const balance = await token.balanceOf(await user.getAddress());
    expect(balance).to.equal(ethers.parseEther("100"));
  });

  it("should emit Deposit event", async () => {
    await expect(
      treasury.connect(user).deposit({
        value: ethers.parseEther("1"),
      })
    )
      .to.emit(treasury, "Deposit")
      .withArgs(
        await user.getAddress(),
        ethers.parseEther("1"),
        ethers.parseEther("100")
      );
  });

  // -------------------------------
  //  Edge Cases
  // -------------------------------
  it("should revert on zero deposit", async () => {
    await expect(
      treasury.connect(user).deposit({ value: 0 })
    ).to.be.revertedWithCustomError(treasury, "InvalidDeposit");
  });

  it("should fail mint if treasury is not minter", async () => {
    const Token = await ethers.getContractFactory("RWAToken");
    const newToken = await Token.deploy(await owner.getAddress());

    const Treasury = await ethers.getContractFactory("Treasury");
    const newTreasury = await Treasury.deploy(
      newToken.target,
      RATE,
      await owner.getAddress()
    );

    await expect(
      newTreasury.connect(user).deposit({
        value: ethers.parseEther("1"),
      })
    ).to.be.reverted;
  });

  // -------------------------------
  //  Withdraw Flow
  // -------------------------------
it("admin should withdraw ETH", async () => {
  await treasury.connect(user).deposit({
    value: ethers.parseEther("1"),
  });

  const contractBalanceBefore = await ethers.provider.getBalance(
    treasury.target
  );

  expect(contractBalanceBefore).to.equal(ethers.parseEther("1"));

  await expect(
    treasury.withdraw(ethers.parseEther("1"))
  ).to.emit(treasury, "Withdraw");

  const contractBalanceAfter = await ethers.provider.getBalance(
    treasury.target
  );

  expect(contractBalanceAfter).to.equal(0n);
});  it("non-admin should not withdraw", async () => {
    await expect(
      treasury.connect(user).withdraw(1)
    ).to.be.reverted;
  });

  it("should revert if insufficient balance", async () => {
    await expect(
      treasury.withdraw(ethers.parseEther("1"))
    ).to.be.revertedWithCustomError(treasury, "InsufficientBalance");
  });

  // -------------------------------
  //  Pause Functionality
  // -------------------------------
  it("should pause deposits", async () => {
    await treasury.pause();

    await expect(
      treasury.connect(user).deposit({
        value: ethers.parseEther("1"),
      })
    ).to.be.reverted;
  });

  it("should unpause deposits", async () => {
    await treasury.pause();
    await treasury.unpause();

    await treasury.connect(user).deposit({
      value: ethers.parseEther("1"),
    });

    const balance = await token.balanceOf(await user.getAddress());
    expect(balance).to.equal(ethers.parseEther("100"));
  });

  // -------------------------------
  //  Rate Logic
  // -------------------------------
  it("should update rate", async () => {
    await treasury.setRate(200);

    await treasury.connect(user).deposit({
      value: ethers.parseEther("1"),
    });

    const balance = await token.balanceOf(await user.getAddress());
    expect(balance).to.equal(ethers.parseEther("200"));
  });

  it("non-admin cannot update rate", async () => {
    await expect(
      treasury.connect(user).setRate(200)
    ).to.be.reverted;
  });

  // -------------------------------
  // Preview Function
  // -------------------------------
  it("should return correct preview", async () => {
    const preview = await treasury.previewDeposit(
      ethers.parseEther("1")
    );

    expect(preview).to.equal(ethers.parseEther("100"));
  });
});
