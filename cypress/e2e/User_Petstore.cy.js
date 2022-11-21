describe("Pet API testing spec", () => {

  const userinputs = {
      id: "9797934799187",
      username: "API",
      firstname: "Bhavani",
      lastname: "Gandhi"
  }
    it('user details', () => {
        cy.request({
            method: 'GET',
            url: `https://petstore.swagger.io/v2/user/API`
        })
        .should((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.have.all.keys(
                'id', 'username', 'firstName', 'lastName', 'email', 'password','phone','userStatus'
            );

            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(userinputs.id);
            expect(response.body.username.name).to.eq(userinputs.username_name);
            expect(response.body.firstName.name).to.eq(userinputs.firstName_name);
            expect(response.body.lastName.name).to.eq(userinputs.lastName_name);
             });
    
    })})
