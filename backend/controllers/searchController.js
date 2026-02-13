import client from "../config/algolia.js";

export const typeaheadController = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: '"q" must be at least 3 characters'
      });
    }

    const response = await client.search({
      requests: [
        {
          indexName: process.env.PRODUCT_INDEX,
          query: q,
          hitsPerPage: 5,
          attributesToRetrieve: [
            "name",
            "description",
            "category",
            "image",
            "rating",
            "objectID",
            "inStock",
            "type"
          ]
        }
      ]
    });

    const { hits, nbHits } = response.results[0];

    const products = hits.map(product => ({
      objectID: product.objectID,
      type: product.type,
      name: product.name,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating,
      inStock: product.inStock
    }));
    return res.status(200).json({
      success: true,
      message: "Search successful",
      products,
      count: nbHits
    });

  } catch (error) {
    console.error("Typeahead error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};