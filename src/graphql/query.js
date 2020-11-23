export const query = `
{
    search(term: "burrito",
           location: "san francisco") {
      total
      business {
        name
        rating
        review_count
        photos
        categories {
            title
        }
        location {
          address1
          city
          state
          country
        }
      }
    }
  }
`