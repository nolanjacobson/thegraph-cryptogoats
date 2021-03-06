// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class CryptoGoat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save CryptoGoat entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save CryptoGoat entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("CryptoGoat", id.toString(), this);
  }

  static load(id: string): CryptoGoat | null {
    return store.get("CryptoGoat", id) as CryptoGoat | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes | null {
    let value = this.get("owner");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set owner(value: Bytes | null) {
    if (value === null) {
      this.unset("owner");
    } else {
      this.set("owner", Value.fromBytes(value as Bytes));
    }
  }

  get goatName(): string | null {
    let value = this.get("goatName");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set goatName(value: string | null) {
    if (value === null) {
      this.unset("goatName");
    } else {
      this.set("goatName", Value.fromString(value as string));
    }
  }

  get goatMetadata(): string | null {
    let value = this.get("goatMetadata");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set goatMetadata(value: string | null) {
    if (value === null) {
      this.unset("goatMetadata");
    } else {
      this.set("goatMetadata", Value.fromString(value as string));
    }
  }

  get goatRandomness(): i32 {
    let value = this.get("goatRandomness");
    return value.toI32();
  }

  set goatRandomness(value: i32) {
    this.set("goatRandomness", Value.fromI32(value));
  }
}
