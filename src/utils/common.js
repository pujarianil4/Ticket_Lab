import { ethers } from 'ethers'

export function BigIntToInt(number) {
    return ethers.utils.formatUnits(number, 0)
}
