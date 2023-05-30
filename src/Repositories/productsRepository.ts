const products = [{ id: 1, title: 'tomato' }, { id: 2, title: 'orange' }]

export const productsRepository = {
  getProducts(title?: string) {
    if (title) {
      return products.filter(p => p.title.indexOf(title) > -1)
    } else {
      return products
    }
  },
  addProduct(id: number, title: string) {
    const newProduct = { id, title }
    products.push(newProduct)
    return newProduct
  },
  getProductById(id: number) {
    return products.find(p => p.id === id)
  },
  updateProduct(id: number, title: string) {
    const product = products.find(p => p.id === id)
    if (product) {
      product.title = title
      return true
    } else {
      return false
    }
  },
  deleteProduct(id: number) {
    let result = false
    products.forEach((p, index) => {
      if (p.id === id) {
        products.splice(index, 1)
        result = true
      }
    })
    return result
  }
}