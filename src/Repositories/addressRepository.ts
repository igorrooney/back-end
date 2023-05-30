const addresses = [{ id: 1, value: 'Street Lane' }, { id: 2, value: 'Lidgett Lane' }]

export const addressRepository = {
  getAddresses() {
    return addresses
  },
  getAddressById(id: number) {
    return addresses.find(p => p.id === id)
  }
}
