import { BigInt, } from "@graphprotocol/graph-ts"
import {
  CryptoGoats,
  Approval,
  ApprovalForAll,
  NewGoat,
  OwnershipTransferred,
  Transfer,
  UpdatedGoatMetadata
} from "../generated/CryptoGoats/CryptoGoats"
import { CryptoGoat } from "../generated/schema"

export function handleNewGoat(event: NewGoat): void {
  let cryptoGoat = new CryptoGoat(event.params.goatId.toHex())
  cryptoGoat.owner = event.transaction.from;
  cryptoGoat.goatName = event.params.name
  cryptoGoat.goatRandomness = 100
  cryptoGoat.goatMetadata = null
  cryptoGoat.save()
}

export function handleUpdatedGoatMetadata(event: UpdatedGoatMetadata): void {
  let id = event.params.goatId.toHex();
  let cryptoGoat = CryptoGoat.load(id);
  cryptoGoat.goatMetadata = event.params.goatMetadata;
  cryptoGoat.save()
}
