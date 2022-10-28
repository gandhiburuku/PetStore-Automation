
describe("Pet API testing spec", () => {
  const userinputs = {
      id: 1234,
      category_name: "buffallo",
      name: "thokka",
      tags_name: "test thokka",
      wrong_id: 15878769887970,
      empty_id: ' '
  }

  const wrong_userinputs = {
      id: 12343435,
      category_name: "buffallo",
      name: "thokka",
      tags_name: "test thokka",
      wrong_id: 15878769887970,
      empty_id: ' '
  }

  /* 
Given a user has POST endpoint - https://petstore.swagger.io/v2/pet
When the user hits POST endpoint by sending JSON body to create new pet in store
Then the user should receive status as 200 and reponse body as per given requirements
*/

  it('add a new pet to the store', () => {
      cy.request({
          method: 'POST',
          url: 'https://petstore.swagger.io/v2/pet',
          body: {
              "id": userinputs.id,
              "category": {
                  "id": 0,
                  "name": userinputs.category_name
              },
              "name": userinputs.name,
              "photoUrls": [
                  "string"
              ],
              "tags": [
                  {
                      "id": 0,
                      "name": userinputs.tags_name
                  }
              ],
              "status": "available"
          }
      })
          .should((response) => {
              cy.log(JSON.stringify(response.body))
              expect(response.body).to.have.all.keys(
                  'id', 'category', 'name', 'photoUrls', 'tags', 'status'
              );

              expect(response.status).to.eq(200);
              expect(response.body.id).to.eq(userinputs.id);
              expect(response.body.category.name).to.eq(userinputs.category_name);
              expect(response.body.name).to.eq(userinputs.name);
              expect(response.body.tags[0].name).to.eq(userinputs.tags_name);
              expect(response.body.status).to.eq("available");
          });
  });

  /* 
Given a user has POST endpoint - https://petstore.swagger.io/v2/pet
When the user hits POST endpoint by missing some fields in JSON body to create new pet in store
Then the user should receive status as 405 and reponse body with "Invlid input"
*/

  it('should return invalid input for body with missing fields to create new pet in the store', () => {
      cy.request({
          method: 'POST',
          url: 'https://petstore.swagger.io/v2/pet',
          failOnStatusCode: false,
          body: {
              "id": wrong_userinputs.id,
              "name": userinputs.name,
              "photoUrls": [
                  "string"
              ],
              "tags": [
                  {
                      "id": 0,
                      "name": userinputs.tags_name
                  }
              ],
              "status": "available"
          }
      })
          .should((response) => {
              cy.log(JSON.stringify(response.body))
              expect(response.body).to.have.all.keys(
                  'code', 'type', 'message'
              );

              expect(response.status).to.eq(405);
              expect(response.body.code).to.eq(1);
              expect(response.body.type).to.eq("error");
              expect(response.body.message).to.eq("Invalid input");
          });
  });

  /* 
Given a user has POST endpoint - https://petstore.swagger.io/v2/pet
When the user hits POST endpoint by empty JSON body to create new pet in store
Then the user should receive status as 405 and reponse body with "Invlid input"
*/

  it('should return invalid input for sending empty body to create new pet in the store', () => {
      cy.request({
          method: 'POST',
          url: 'https://petstore.swagger.io/v2/pet',
          failOnStatusCode: false,
          body: {

          }
      })
          .should((response) => {
              cy.log(JSON.stringify(response.body))
              expect(response.body).to.have.all.keys(
                  'code', 'type', 'message'
              );

              expect(response.status).to.eq(405);
              expect(response.body.code).to.eq(1);
              expect(response.body.type).to.eq("error");
              expect(response.body.message).to.eq("Invalid input");
          });
  });

  /* 
Given a user has GET endpoint - https://petstore.swagger.io/v2/pet
When the user hits GET endpoint by passing petid to retrieve existing pet in store
Then the user should receive status as 200 and reponse body as per given requirements
*/

  it('should return "pet details" for the given petid', () => {
      cy.request({
          method: 'GET',
          url: `https://petstore.swagger.io/v2/pet/${userinputs.id}`
      })
          .should((response) => {
              cy.log(JSON.stringify(response.body))
              expect(response.body).to.have.all.keys(
                  'id', 'category', 'category', 'name', 'photoUrls', 'tags'
              );

              expect(response.status).to.eq(200);
              expect(response.body.id).to.eq(userinputs.id);
              expect(response.body.category.name).to.eq(userinputs.category_name);
              expect(response.body.name).to.eq(userinputs.name);
              expect(response.body.tags[0].name).to.eq(userinputs.tags_name);
              expect(response.body.status).to.eq("available");
          });
  });

  /* 
Given a user has GET endpoint - https://petstore.swagger.io/v2/pet
When the user hits GET endpoint by passing wrong input id
Then the user should receive status as 405 and reponse body with "Invlid input"
*/

  it('should return response with "Pet not found" for the given integer petid', () => {
      cy.request({
          method: 'GET',
          url: `https://petstore.swagger.io/v2/pet/${wrong_userinputs.wrong_id}`,
          failOnStatusCode: false
      })
          .should((response) => {
              cy.log(JSON.stringify(response.body))
              expect(response.body).to.have.all.keys(
                  'code', 'type', 'message'
              );

              expect(response.status).to.eq(404);
              expect(response.body.code).to.eq(1);
              expect(response.body.type).to.eq("error");
              expect(response.body.message).to.eq("Pet not found");
          });
  });

  /* 
Given a user has GET endpoint - https://petstore.swagger.io/v2/pet
When the user hits GET endpoint by passing wrong input id
Then the user should receive status as 405 and reponse body with "Invlid input"
*/

  it('should return response with "Invalid input" for the given invalid petid', () => {
      cy.request({
          method: 'GET',
          url: `https://petstore.swagger.io/v2/pet/${wrong_userinputs.empty_id}`,
          failOnStatusCode: false
      })
          .should((response) => {
              cy.log(JSON.stringify(response.body))
              expect(response.body).to.have.all.keys(
                  'code', 'type', 'message'
              );

              expect(response.status).to.eq(405);
              expect(response.body.code).to.eq(1);
              expect(response.body.type).to.eq("error");
              expect(response.body.message).to.eq("Invalid input");
          });
  });
})