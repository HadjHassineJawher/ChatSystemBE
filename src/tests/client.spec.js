const chai = require('chai')
const server = require('../server')
const chaiHttp = require('chai-http')
const { expect } = require('chai')

chai.should()
chai.use(chaiHttp)

/**
 *  ? Test cases : to test all the Client APIs
 *  ? Covered Resolvres :
 *      * Add new Client.
 *      * Authentificate a Client.
*/

describe("Testing Clients Collection", () => {
    /**
     *  ! Testing the Add resolve.
    */
    
    it('It should add new User to the collection.', () => {
        chai.request(server).post("/graphql").send(
            {
                "query": `
                    mutation{
                        CreateClient(input: {username: "UnitTesting", password: "UnitTesting", age: "27/03/2022", email: "UnitTesting@gmail.com", phone: "29698907"}){
                            username
                            email
                            age
                        }
                    }`
            }
        
        ).end((err, res) => {
            res.body.should.have.property('data').which.is.an('object');
            expect(res.body).to.deep.nested.property('data.CreateClient').which.is.an('object');
            expect(res.body).to.deep.nested.property('data.CreateClient.username').eql('UnitTesting');
            expect(res.body).to.deep.nested.property('data.CreateClient.email').eql('UnitTesting@gmail.com');
            expect(res.body).to.deep.nested.property('data.CreateClient.age').eql('27/03/2022');
            if (err) console.log("Unit Testing Error : " + err)
            
        }) 
    })

    /**
     *  ! Testing the Auth resolve.
    */
    
    it('It should Authentificate a User.', () => {
        chai.request(server).post("/graphql").send(
            {
                "query": `
                    query{
                        ClientLogin(email: "hadjhassinejawher3@gmail.com", password: "Jawher123") {
                            token
                            refreshtoken
                        }
                    }`
            }

        ).end((err, res) => {
            res.body.should.have.property('data').which.is.an('object');
            expect(res.body).to.deep.nested.property('data.ClientLogin').which.is.an('object');
            expect(res.body).to.deep.nested.property('data.ClientLogin.token').which.is.an('string');
            expect(res.body).to.deep.nested.property('data.ClientLogin.refreshtoken').which.is.an('string');
            if (err) console.log("Unit Testing Error : " + err)
        }) 
    })
})
