import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockUSDC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockUsdcAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "faucet",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    type: "error",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "allowance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC20InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC20InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "spender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSpender",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
] as const;

export const mockUsdcAddress =
  "0xAB6a56DA5c42976953FE245F478f0b183B2479BF" as const;

export const mockUsdcConfig = {
  address: mockUsdcAddress,
  abi: mockUsdcAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SkyOdds
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const skyOddsAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_USDCToken", internalType: "address", type: "address" },
      { name: "_oracleResolver", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "ADMIN_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "BASIS_POINTS",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "DEFAULT_LIQUIDITY_PARAM",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "MARKET_CLOSE_BUFFER",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "PLATFORM_FEE",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "USDCToken",
    outputs: [{ name: "", internalType: "contract IERC20", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "flightId", internalType: "bytes32", type: "bytes32" },
      { name: "outcome", internalType: "enum SkyOdds.Outcome", type: "uint8" },
      {
        name: "position",
        internalType: "enum SkyOdds.Position",
        type: "uint8",
      },
      { name: "cost", internalType: "uint256", type: "uint256" },
    ],
    name: "calculateSharesForCost",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "flightId", internalType: "bytes32", type: "bytes32" },
      { name: "user", internalType: "address", type: "address" },
    ],
    name: "calculateWinnings",
    outputs: [
      { name: "payout", internalType: "uint256", type: "uint256" },
      { name: "fee", internalType: "uint256", type: "uint256" },
      { name: "canClaim", internalType: "bool", type: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "flightId", internalType: "bytes32", type: "bytes32" },
      { name: "reason", internalType: "string", type: "string" },
    ],
    name: "cancelMarket",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "flightId", internalType: "bytes32", type: "bytes32" }],
    name: "claimWinnings",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "flightNumber", internalType: "string", type: "string" },
      { name: "departureCode", internalType: "string", type: "string" },
      { name: "destinationCode", internalType: "string", type: "string" },
      { name: "airlineCode", internalType: "string", type: "string" },
      { name: "scheduledDeparture", internalType: "uint256", type: "uint256" },
      { name: "liquidityParameter", internalType: "uint256", type: "uint256" },
    ],
    name: "createFlightMarket",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "flightId", internalType: "bytes32", type: "bytes32" }],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "flightIds",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    name: "flights",
    outputs: [
      { name: "flightNumber", internalType: "string", type: "string" },
      { name: "departureCode", internalType: "string", type: "string" },
      { name: "destinationCode", internalType: "string", type: "string" },
      { name: "airlineCode", internalType: "string", type: "string" },
      { name: "scheduledDeparture", internalType: "uint256", type: "uint256" },
      { name: "marketCloseTime", internalType: "uint256", type: "uint256" },
      { name: "outcome", internalType: "enum SkyOdds.Outcome", type: "uint8" },
      { name: "isCancelled", internalType: "bool", type: "bool" },
      { name: "exists", internalType: "bool", type: "bool" },
      { name: "onTimeShares", internalType: "uint256", type: "uint256" },
      { name: "delayed30Shares", internalType: "uint256", type: "uint256" },
      {
        name: "delayed120PlusShares",
        internalType: "uint256",
        type: "uint256",
      },
      { name: "cancelledShares", internalType: "uint256", type: "uint256" },
      { name: "liquidityParameter", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getAllFlightIds",
    outputs: [{ name: "", internalType: "bytes32[]", type: "bytes32[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "flightId", internalType: "bytes32", type: "bytes32" }],
    name: "getAllPrices",
    outputs: [
      { name: "onTimePrice", internalType: "uint256", type: "uint256" },
      { name: "delayed30Price", internalType: "uint256", type: "uint256" },
      { name: "delayed120PlusPrice", internalType: "uint256", type: "uint256" },
      { name: "cancelledPrice", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "flightId", internalType: "bytes32", type: "bytes32" }],
    name: "getFlightInfo",
    outputs: [
      { name: "flightNumber", internalType: "string", type: "string" },
      { name: "departureCode", internalType: "string", type: "string" },
      { name: "destinationCode", internalType: "string", type: "string" },
      { name: "scheduledDeparture", internalType: "uint256", type: "uint256" },
      { name: "marketCloseTime", internalType: "uint256", type: "uint256" },
      { name: "outcome", internalType: "enum SkyOdds.Outcome", type: "uint8" },
      { name: "isCancelled", internalType: "bool", type: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "flightId", internalType: "bytes32", type: "bytes32" }],
    name: "getMarketShares",
    outputs: [
      { name: "onTimeShares", internalType: "uint256", type: "uint256" },
      { name: "delayed30Shares", internalType: "uint256", type: "uint256" },
      {
        name: "delayed120PlusShares",
        internalType: "uint256",
        type: "uint256",
      },
      { name: "cancelledShares", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "flightId", internalType: "bytes32", type: "bytes32" },
      { name: "outcome", internalType: "enum SkyOdds.Outcome", type: "uint8" },
    ],
    name: "getPrice",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "flightId", internalType: "bytes32", type: "bytes32" },
      { name: "user", internalType: "address", type: "address" },
      { name: "outcome", internalType: "enum SkyOdds.Outcome", type: "uint8" },
    ],
    name: "getUserPosition",
    outputs: [
      { name: "yesShares", internalType: "uint256", type: "uint256" },
      { name: "noShares", internalType: "uint256", type: "uint256" },
      { name: "totalCost", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "bytes32", type: "bytes32" },
      { name: "", internalType: "address", type: "address" },
    ],
    name: "hasClaimed",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "oracleResolver",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "paused",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "flightId", internalType: "bytes32", type: "bytes32" },
      { name: "outcome", internalType: "enum SkyOdds.Outcome", type: "uint8" },
      {
        name: "position",
        internalType: "enum SkyOdds.Position",
        type: "uint8",
      },
      { name: "cost", internalType: "uint256", type: "uint256" },
    ],
    name: "placeBet",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "callerConfirmation", internalType: "address", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "flightId", internalType: "bytes32", type: "bytes32" },
      {
        name: "actualOutcome",
        internalType: "enum SkyOdds.Outcome",
        type: "uint8",
      },
    ],
    name: "resolveMarket",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_newResolver", internalType: "address", type: "address" },
    ],
    name: "setOracleResolver",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "bytes32", type: "bytes32" },
      { name: "", internalType: "enum SkyOdds.Outcome", type: "uint8" },
    ],
    name: "totalCostByOutcome",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    name: "totalDeposited",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalFeesCollected",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalFeesWithdrawn",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    name: "totalPoolAmount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "to", internalType: "address", type: "address" }],
    name: "withdrawFees",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "flightId", internalType: "bytes32", type: "bytes32" }],
    name: "withdrawFromCancelledMarket",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "flightId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "EmergencyWithdrawal",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "FeesWithdrawn",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "flightId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "reason",
        internalType: "string",
        type: "string",
        indexed: false,
      },
    ],
    name: "MarketCancelled",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "flightId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "flightNumber",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      {
        name: "scheduledDeparture",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "marketCloseTime",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "liquidityParameter",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "MarketCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "flightId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "outcome",
        internalType: "enum SkyOdds.Outcome",
        type: "uint8",
        indexed: false,
      },
      {
        name: "timestamp",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "MarketResolved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "oldResolver",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newResolver",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OracleResolverUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Paused",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "previousAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "newAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
    ],
    name: "RoleAdminChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleGranted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleRevoked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "flightId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "outcome",
        internalType: "enum SkyOdds.Outcome",
        type: "uint8",
        indexed: false,
      },
      {
        name: "position",
        internalType: "enum SkyOdds.Position",
        type: "uint8",
        indexed: false,
      },
      {
        name: "shares",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "cost",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "SharesPurchased",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "flightId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "onTimeShares",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "delayed30Shares",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "delayed120PlusShares",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "cancelledShares",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "SharesUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Unpaused",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "flightId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "payout",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "fee", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "WinningsClaimed",
  },
  { type: "error", inputs: [], name: "AccessControlBadConfirmation" },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "neededRole", internalType: "bytes32", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
  },
  { type: "error", inputs: [], name: "EnforcedPause" },
  { type: "error", inputs: [], name: "ExpectedPause" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "error",
    inputs: [
      { name: "x", internalType: "uint256", type: "uint256" },
      { name: "y", internalType: "uint256", type: "uint256" },
    ],
    name: "PRBMath_MulDiv18_Overflow",
  },
  {
    type: "error",
    inputs: [
      { name: "x", internalType: "uint256", type: "uint256" },
      { name: "y", internalType: "uint256", type: "uint256" },
      { name: "denominator", internalType: "uint256", type: "uint256" },
    ],
    name: "PRBMath_MulDiv_Overflow",
  },
  { type: "error", inputs: [], name: "PRBMath_SD59x18_Div_InputTooSmall" },
  {
    type: "error",
    inputs: [
      { name: "x", internalType: "SD59x18", type: "int256" },
      { name: "y", internalType: "SD59x18", type: "int256" },
    ],
    name: "PRBMath_SD59x18_Div_Overflow",
  },
  {
    type: "error",
    inputs: [{ name: "x", internalType: "SD59x18", type: "int256" }],
    name: "PRBMath_SD59x18_Exp2_InputTooBig",
  },
  {
    type: "error",
    inputs: [{ name: "x", internalType: "SD59x18", type: "int256" }],
    name: "PRBMath_SD59x18_Exp_InputTooBig",
  },
  {
    type: "error",
    inputs: [{ name: "x", internalType: "SD59x18", type: "int256" }],
    name: "PRBMath_SD59x18_Log_InputTooSmall",
  },
  { type: "error", inputs: [], name: "PRBMath_SD59x18_Mul_InputTooSmall" },
  {
    type: "error",
    inputs: [
      { name: "x", internalType: "SD59x18", type: "int256" },
      { name: "y", internalType: "SD59x18", type: "int256" },
    ],
    name: "PRBMath_SD59x18_Mul_Overflow",
  },
  { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
] as const;

export const skyOddsAddress =
  "0x431119E3f9A2108B0D53BF3Ebbba057bFdF552d7" as const;

export const skyOddsConfig = {
  address: skyOddsAddress,
  abi: skyOddsAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__
 */
export const useReadMockUsdc = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadMockUsdcAllowance = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "allowance",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMockUsdcBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadMockUsdcDecimals = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "decimals",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"name"`
 */
export const useReadMockUsdcName = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMockUsdcOwner = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadMockUsdcSymbol = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadMockUsdcTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__
 */
export const useWriteMockUsdc = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteMockUsdcApprove = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"faucet"`
 */
export const useWriteMockUsdcFaucet = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "faucet",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteMockUsdcMint = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMockUsdcRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteMockUsdcTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "transfer",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteMockUsdcTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMockUsdcTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__
 */
export const useSimulateMockUsdc = /*#__PURE__*/ createUseSimulateContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMockUsdcApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "approve",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"faucet"`
 */
export const useSimulateMockUsdcFaucet =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "faucet",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateMockUsdcMint = /*#__PURE__*/ createUseSimulateContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMockUsdcRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateMockUsdcTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateMockUsdcTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMockUsdcTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdcAbi}__
 */
export const useWatchMockUsdcEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdcAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchMockUsdcApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdcAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMockUsdcOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdcAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchMockUsdcTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__
 */
export const useReadSkyOdds = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 */
export const useReadSkyOddsAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "ADMIN_ROLE",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"BASIS_POINTS"`
 */
export const useReadSkyOddsBasisPoints = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "BASIS_POINTS",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadSkyOddsDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "DEFAULT_ADMIN_ROLE",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"DEFAULT_LIQUIDITY_PARAM"`
 */
export const useReadSkyOddsDefaultLiquidityParam =
  /*#__PURE__*/ createUseReadContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "DEFAULT_LIQUIDITY_PARAM",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"MARKET_CLOSE_BUFFER"`
 */
export const useReadSkyOddsMarketCloseBuffer =
  /*#__PURE__*/ createUseReadContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "MARKET_CLOSE_BUFFER",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"PLATFORM_FEE"`
 */
export const useReadSkyOddsPlatformFee = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "PLATFORM_FEE",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"USDCToken"`
 */
export const useReadSkyOddsUsdcToken = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "USDCToken",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"calculateSharesForCost"`
 */
export const useReadSkyOddsCalculateSharesForCost =
  /*#__PURE__*/ createUseReadContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "calculateSharesForCost",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"calculateWinnings"`
 */
export const useReadSkyOddsCalculateWinnings =
  /*#__PURE__*/ createUseReadContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "calculateWinnings",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"flightIds"`
 */
export const useReadSkyOddsFlightIds = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "flightIds",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"flights"`
 */
export const useReadSkyOddsFlights = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "flights",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"getAllFlightIds"`
 */
export const useReadSkyOddsGetAllFlightIds =
  /*#__PURE__*/ createUseReadContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "getAllFlightIds",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"getAllPrices"`
 */
export const useReadSkyOddsGetAllPrices = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "getAllPrices",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"getFlightInfo"`
 */
export const useReadSkyOddsGetFlightInfo = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "getFlightInfo",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"getMarketShares"`
 */
export const useReadSkyOddsGetMarketShares =
  /*#__PURE__*/ createUseReadContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "getMarketShares",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"getPrice"`
 */
export const useReadSkyOddsGetPrice = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "getPrice",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadSkyOddsGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "getRoleAdmin",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"getUserPosition"`
 */
export const useReadSkyOddsGetUserPosition =
  /*#__PURE__*/ createUseReadContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "getUserPosition",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"hasClaimed"`
 */
export const useReadSkyOddsHasClaimed = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "hasClaimed",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadSkyOddsHasRole = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "hasRole",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"oracleResolver"`
 */
export const useReadSkyOddsOracleResolver = /*#__PURE__*/ createUseReadContract(
  { abi: skyOddsAbi, address: skyOddsAddress, functionName: "oracleResolver" }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"owner"`
 */
export const useReadSkyOddsOwner = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"paused"`
 */
export const useReadSkyOddsPaused = /*#__PURE__*/ createUseReadContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "paused",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadSkyOddsSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "supportsInterface",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"totalCostByOutcome"`
 */
export const useReadSkyOddsTotalCostByOutcome =
  /*#__PURE__*/ createUseReadContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "totalCostByOutcome",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"totalDeposited"`
 */
export const useReadSkyOddsTotalDeposited = /*#__PURE__*/ createUseReadContract(
  { abi: skyOddsAbi, address: skyOddsAddress, functionName: "totalDeposited" }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"totalFeesCollected"`
 */
export const useReadSkyOddsTotalFeesCollected =
  /*#__PURE__*/ createUseReadContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "totalFeesCollected",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"totalFeesWithdrawn"`
 */
export const useReadSkyOddsTotalFeesWithdrawn =
  /*#__PURE__*/ createUseReadContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "totalFeesWithdrawn",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"totalPoolAmount"`
 */
export const useReadSkyOddsTotalPoolAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "totalPoolAmount",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__
 */
export const useWriteSkyOdds = /*#__PURE__*/ createUseWriteContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"cancelMarket"`
 */
export const useWriteSkyOddsCancelMarket = /*#__PURE__*/ createUseWriteContract(
  { abi: skyOddsAbi, address: skyOddsAddress, functionName: "cancelMarket" }
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"claimWinnings"`
 */
export const useWriteSkyOddsClaimWinnings =
  /*#__PURE__*/ createUseWriteContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "claimWinnings",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"createFlightMarket"`
 */
export const useWriteSkyOddsCreateFlightMarket =
  /*#__PURE__*/ createUseWriteContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "createFlightMarket",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"emergencyWithdraw"`
 */
export const useWriteSkyOddsEmergencyWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "emergencyWithdraw",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteSkyOddsGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "grantRole",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteSkyOddsPause = /*#__PURE__*/ createUseWriteContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "pause",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"placeBet"`
 */
export const useWriteSkyOddsPlaceBet = /*#__PURE__*/ createUseWriteContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "placeBet",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteSkyOddsRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteSkyOddsRenounceRole = /*#__PURE__*/ createUseWriteContract(
  { abi: skyOddsAbi, address: skyOddsAddress, functionName: "renounceRole" }
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"resolveMarket"`
 */
export const useWriteSkyOddsResolveMarket =
  /*#__PURE__*/ createUseWriteContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "resolveMarket",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteSkyOddsRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "revokeRole",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"setOracleResolver"`
 */
export const useWriteSkyOddsSetOracleResolver =
  /*#__PURE__*/ createUseWriteContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "setOracleResolver",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteSkyOddsTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteSkyOddsUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "unpause",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"withdrawFees"`
 */
export const useWriteSkyOddsWithdrawFees = /*#__PURE__*/ createUseWriteContract(
  { abi: skyOddsAbi, address: skyOddsAddress, functionName: "withdrawFees" }
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"withdrawFromCancelledMarket"`
 */
export const useWriteSkyOddsWithdrawFromCancelledMarket =
  /*#__PURE__*/ createUseWriteContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "withdrawFromCancelledMarket",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__
 */
export const useSimulateSkyOdds = /*#__PURE__*/ createUseSimulateContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"cancelMarket"`
 */
export const useSimulateSkyOddsCancelMarket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "cancelMarket",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"claimWinnings"`
 */
export const useSimulateSkyOddsClaimWinnings =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "claimWinnings",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"createFlightMarket"`
 */
export const useSimulateSkyOddsCreateFlightMarket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "createFlightMarket",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"emergencyWithdraw"`
 */
export const useSimulateSkyOddsEmergencyWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "emergencyWithdraw",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateSkyOddsGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "grantRole",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateSkyOddsPause = /*#__PURE__*/ createUseSimulateContract({
  abi: skyOddsAbi,
  address: skyOddsAddress,
  functionName: "pause",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"placeBet"`
 */
export const useSimulateSkyOddsPlaceBet =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "placeBet",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateSkyOddsRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateSkyOddsRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "renounceRole",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"resolveMarket"`
 */
export const useSimulateSkyOddsResolveMarket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "resolveMarket",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateSkyOddsRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "revokeRole",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"setOracleResolver"`
 */
export const useSimulateSkyOddsSetOracleResolver =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "setOracleResolver",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateSkyOddsTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateSkyOddsUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "unpause",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"withdrawFees"`
 */
export const useSimulateSkyOddsWithdrawFees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "withdrawFees",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link skyOddsAbi}__ and `functionName` set to `"withdrawFromCancelledMarket"`
 */
export const useSimulateSkyOddsWithdrawFromCancelledMarket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    functionName: "withdrawFromCancelledMarket",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__
 */
export const useWatchSkyOddsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: skyOddsAbi,
  address: skyOddsAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"EmergencyWithdrawal"`
 */
export const useWatchSkyOddsEmergencyWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "EmergencyWithdrawal",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"FeesWithdrawn"`
 */
export const useWatchSkyOddsFeesWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "FeesWithdrawn",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"MarketCancelled"`
 */
export const useWatchSkyOddsMarketCancelledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "MarketCancelled",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"MarketCreated"`
 */
export const useWatchSkyOddsMarketCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "MarketCreated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"MarketResolved"`
 */
export const useWatchSkyOddsMarketResolvedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "MarketResolved",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"OracleResolverUpdated"`
 */
export const useWatchSkyOddsOracleResolverUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "OracleResolverUpdated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchSkyOddsOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchSkyOddsPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "Paused",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchSkyOddsRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "RoleAdminChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchSkyOddsRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "RoleGranted",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchSkyOddsRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "RoleRevoked",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"SharesPurchased"`
 */
export const useWatchSkyOddsSharesPurchasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "SharesPurchased",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"SharesUpdated"`
 */
export const useWatchSkyOddsSharesUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "SharesUpdated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchSkyOddsUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "Unpaused",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link skyOddsAbi}__ and `eventName` set to `"WinningsClaimed"`
 */
export const useWatchSkyOddsWinningsClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: skyOddsAbi,
    address: skyOddsAddress,
    eventName: "WinningsClaimed",
  });
