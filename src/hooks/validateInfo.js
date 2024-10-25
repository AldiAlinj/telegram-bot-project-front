export default function validateInfo(walletAddress) {
  let error = "";
  if (!walletAddress) {
    error = "Wallet Address required";
  } else if (!/^0x[a-fA-F0-9]{40}$/g.test(walletAddress)) {
    error = "Wallet Address is invalid";
  }
  return error;
}
