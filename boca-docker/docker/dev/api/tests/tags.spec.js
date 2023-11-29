const request = require('supertest');


describe('Contest Tags', () => {

  const baseUrl = "localhost:49160"


  describe('POST Methods', () => {

    it('Cadastra uma nova tag associada à competição - /api/contest/:id_c/tag', async () => {
      const constestID = "3"; // id da competição
      const res = await request(baseUrl)
      .post("/api/contest/" + constestID + "/tag")
      .send({
        "tag_name": "Tag Teste",
        "tag_value": "basic select"
      })

      expect(res.statusCode).toEqual(200);
    });

    it('Não deve conseguir cadastrar uma tag com nome repetido - /api/contest/:id_c/tag', async () => {
      const constestID = "3"; // id da competição
      const res = await request(baseUrl)
      .post("/api/contest/" + constestID + "/tag")
      .send({
        "tag_name": "Tag Teste",
        "tag_value": "basic select"
      })

      expect(res.statusCode).toEqual(409);
    });

  });

  describe('GET Methods', () => {

    it('Deve listar as tags associadas à competição existente - /api/contest/:id_c/tag', async () => {
      const constestID = "3";  // id da competição
      const res = await request(baseUrl)
      .get("/api/contest/" + constestID + "/tag");

      // Status Http 200 OK - Requisição bem sucedida
      expect(res.statusCode).toEqual(200);


      // O banco ja é iniciado com 2 tags na competicao de id 3 -> 05 - tests.sql.
      expect(res.body.length).toBeGreaterThanOrEqual(2);
    });
    


    it("Deve mostrar as informações da tag de competição dado os devidos id's - /api/contest/:id_c/tag/:id_t", async () => {
      const constestID = "3";  // id da competição
      const tagIDResult = "1"; // id da tag ligada na competicao
      const tagIDEmpty = "2"; // id da não tag ligada a competição


      // Res da query com Tag ligada à competição
      const resExists = await request(baseUrl)
      .get("/api/contest/" + constestID + "/tag/" + tagIDResult);


      // Res da query com Tag existente não ligada a competição
      const resEmpty = await request(baseUrl)
      .get("/api/contest/" + constestID + "/tag/" + tagIDEmpty);


      // Status Http 200 OK - Requisição bem sucedida
      expect(resExists.statusCode).toEqual(200);


      // Status Http 404 Not Found - Requisição bem sucessida, mas o servidor não encontra o recurso solicitado
      expect(resEmpty.statusCode).toEqual(404);


      // Contem os dados da tag
      expect(resExists.body).toEqual([{
        "tag_id": 1,
        "tag_name": "domain",
        "tag_value": "basic select"
      }])

      // Body com mensagem de não encontrado
      expect(resEmpty.body).toEqual({"error": "Tag não encontrada"});
    })

  });

  describe('PUT Methods', () => {

    it('Atualiza a tag dado seu id e o id da competição - /api/contest/:id_c/tag/:id_t', async () => {
      const constestID = "3"; // id da competição

      const searchByName = await request(baseUrl) // id da tag ligada na competicao
      .get("/api/tag")
      .send({
        "tag_name": "Tag Teste"
      });
      
      const tagID = searchByName.body[0].tag_id;

      const res = await request(baseUrl)
      .put("/api/contest/" + constestID + "/tag/" + tagID)
      .send({
        "tag_name": "Tag Atualizada",       // Novo nome da tag
        "tag_value": "basic select"         // Novo valor da tag 
      });

      // Status Http 200 OK - Espera-se que a tag exista e seja atualizada
      expect(res.statusCode).toEqual(200);
    });

  });

  describe('DELETE Methods', () => {

    it('Remover a tag dado seu id e o id da competição - /api/contest/:id_c/tag/:id_t', async () => {
      const constestID = "3"; // id da competição

      const searchByName = await request(baseUrl) // id da tag ligada na competicao
      .get("/api/tag")
      .send({
        "tag_name": "Tag Atualizada"
      });

      const tagID = searchByName.body[0].tag_id;
      const res = await request(baseUrl)
      .delete("/api/contest/" + constestID + "/tag/" + tagID);

      
      // espera-se que a ação tenha sido completada na volta da resposta - Http status 200 OK - https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE
      expect(res.statusCode).toEqual(200);
    });

  });

})