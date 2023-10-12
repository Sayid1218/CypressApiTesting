/// <reference types="Cypress"> </reference>
describe('CRUD user Oparetions', () => {
    it('Users', () => {
        cy.log("Create User")
        cy.request(
            {
                method:'POST',
                url : 'https://reqres.in/api/users',
                headers :{
                    'Content-Type': 'application/json'
                },
                body:
                {
                    "name": "King",
                    "job": "SQA Engineer",
                    "id" : 10
                
                }

                
            }
        ).then((res)=>{
            expect(res.status).to.eq(201);
            expect(res.body.name).to.eq("King");
            expect(res.body.id).to.eq(10);
      
        }).then((res)=>{
            cy.log("Get a User");
           const id =   res.body.id;
           
                cy.request(
                    {
                        mthod:'GET',
                        url : 'https://reqres.in/api/users/'+id,
                        headers :{
                            'Content-Type': 'application/json'
                        }
                    }
                ).then((res)=>{
                    cy.log(JSON.stringify(res));
                    expect(res.status).to.eq(200);
                
                    
                }).then((res)=>{
                    cy.log("Update User");
                    cy.request(
                        {
                            method:'PUT',
                            url : 'https://reqres.in/api/users/'+id,
                            headers :{
                                'Content-Type': 'application/json'
                            },
                            body :  {
                                    "name": "King",
                                    "job": "SQA Engineer"
                                }
                            
                        }
                    ).then((res)=>{
                        cy.log(JSON.stringify(res));
                        cy.log("name"+"  " + res.body.name);
                        expect(res.status).to.eq(200);
                        expect(res.body.name).to.eq("King");
                        expect(res.body.job).to.eq("SQA Engineer");                    
                    }).then((res)=>{
                        cy.log("Delete User");
                        cy.request(
                            {
                                method:'DELETE',
                                url : 'https://reqres.in/api/users/'+id,
                                headers :{
                                    'Content-Type': 'application/json'
                                }
                             
                                
                            
                    }).then((res)=>{
                        expect(res.status).to.eq(204);
                    }).then((res)=>{
                        cy.log("Get all User");
                        cy.request({
                            method:'GET',
                            url : 'https://reqres.in/api/users?page=2',
                            headers :{
                                'Content-Type': 'application/json'
                            }
                        }).then((res)=>{
                            cy.log(JSON.stringify(res.body));
                            expect(res.status).to.eq(200);
                        });
                    });
                });
            });
            
        });  
         
        });
     
        });
