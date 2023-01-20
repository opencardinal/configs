export type CardinalOnchainStorage = {
  "version": "1.0.0",
  "name": "cardinal_onchain_storage",
  "instructions": [
    {
      "name": "initStorageEntry",
      "accounts": [
        {
          "name": "storageEntry",
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
            "defined": "InitStorageEntryIx"
          }
        }
      ]
    },
    {
      "name": "updateStorageEntry",
      "accounts": [
        {
          "name": "storageEntry",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "UpdateStorageEntryIx"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "storageEntry",
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
      "name": "InitStorageEntryIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
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
      "name": "UpdateStorageEntryIx",
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
      "name": "MissingRemainingAccountsForStorageEntry",
      "msg": "Missing remaining accounts for storage entry"
    }
  ]
};

export const IDL: CardinalOnchainStorage = {
  "version": "1.0.0",
  "name": "cardinal_onchain_storage",
  "instructions": [
    {
      "name": "initStorageEntry",
      "accounts": [
        {
          "name": "storageEntry",
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
            "defined": "InitStorageEntryIx"
          }
        }
      ]
    },
    {
      "name": "updateStorageEntry",
      "accounts": [
        {
          "name": "storageEntry",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "UpdateStorageEntryIx"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "storageEntry",
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
      "name": "InitStorageEntryIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
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
      "name": "UpdateStorageEntryIx",
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
      "name": "MissingRemainingAccountsForStorageEntry",
      "msg": "Missing remaining accounts for storage entry"
    }
  ]
};
