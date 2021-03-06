export class Constantes {
    static readonly DATE_FMT = 'dd/MM/yyyy';
    static readonly DATE_TIME_FMT = `${Constantes.DATE_FMT} hh:mm:ss`;
    
    //rotas
    static readonly END_POINT_API = 'http://localhost:3000/v1/Eventos';
    static readonly END_POINT_AUTHENTICATION = 'http://localhost:3000/v1/Accounts/authenticate';
    static readonly END_POINT_USER = 'http://localhost:3000/v1/Users';

}