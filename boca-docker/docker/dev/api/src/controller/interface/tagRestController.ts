export interface TagRestContoller {
    listarTodasTagsCompeticao(req: Request, res: Response);
    listarTagCompeticao(req: Request, res: Response);
    cadastrarNovaTag(req: Request, res: Response);
    associarTagACompeticao(req: Request, res: Response);
    deletarTag(req: Request, res: Response);
    atualizarTag(req: Request, res: Response);
    listarTag(req: Request, res: Response);
    cadastrarEAssociarNovaTag(req: Request, res: Response);
    buscarTagPorNome(req: Request, res: Response);
}