import TagRestContollerImpl  from '../src/controller/tagRestControllerImpl';
import  Router  from 'express';


const tagRouter = Router();

tagRouter.get('/', (_, res) => {
  return res.send('Olá!');
});

tagRouter.get('/api/contest/:id_c/tag', TagRestContollerImpl.listarTodasTagsCompeticao);
tagRouter.post('/api/contest/:id_c/tag', TagRestContollerImpl.cadastrarEAssociarNovaTag);
tagRouter.get('/api/contest/:id_c/tag/:id_t', TagRestContollerImpl.listarTagCompeticao);
tagRouter.put('/api/contest/:id_c/tag/:id_t', TagRestContollerImpl.atualizarTag);
tagRouter.delete('/api/contest/:id_c/tag/:id_t', TagRestContollerImpl.deletarTag);

tagRouter.get('/api/tag', TagRestContollerImpl.buscarTagPorNome);


export { tagRouter };