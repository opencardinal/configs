export type CardinalConfigs = {
  "version": "1.0.0",
  "name": "cardinal_configs",
  "instructions": [
    {
      "name": "initConfigEntry",
      "accounts": [
        {
          "name": "configEntry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitConfigEntryIx"
          }
        }
      ]
    },
    {
      "name": "updateConfigEntry",
      "accounts": [
        {
          "name": "configEntry",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "UpdateConfigEntryIx"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "configEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "key",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          },
          {
            "name": "extends",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitConfigEntryIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          },
          {
            "name": "extends",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateConfigEntryIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": "string"
          },
          {
            "name": "extends",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6001,
      "name": "MissingRemainingAccountsForConfigEntry",
      "msg": "Missing remaining accounts for config entry"
    },
    {
      "code": 6002,
      "name": "InvalidStakePoolAccount",
      "msg": "Invalid stake pool account"
    },
    {
      "code": 6003,
      "name": "InvalidRewardCenterPoolAccount",
      "msg": "Invalid reward center pool account"
    },
    {
      "code": 6004,
      "name": "InvalidPoolAuthority",
      "msg": "Invalid pool authority"
    }
  ]
};

export const IDL: CardinalConfigs = {
  "version": "1.0.0",
  "name": "cardinal_configs",
  "instructions": [
    {
      "name": "initConfigEntry",
      "accounts": [
        {
          "name": "configEntry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitConfigEntryIx"
          }
        }
      ]
    },
    {
      "name": "updateConfigEntry",
      "accounts": [
        {
          "name": "configEntry",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "UpdateConfigEntryIx"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "configEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "key",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          },
          {
            "name": "extends",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitConfigEntryIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          },
          {
            "name": "extends",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateConfigEntryIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": "string"
          },
          {
            "name": "extends",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6001,
      "name": "MissingRemainingAccountsForConfigEntry",
      "msg": "Missing remaining accounts for config entry"
    },
    {
      "code": 6002,
      "name": "InvalidStakePoolAccount",
      "msg": "Invalid stake pool account"
    },
    {
      "code": 6003,
      "name": "InvalidRewardCenterPoolAccount",
      "msg": "Invalid reward center pool account"
    },
    {
      "code": 6004,
      "name": "InvalidPoolAuthority",
      "msg": "Invalid pool authority"
    }
  ]
};
