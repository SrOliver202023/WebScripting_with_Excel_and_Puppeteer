interface IClient {
    row: number,
    name: string,
    contact: string;
}
interface IClientDTO {
    row: number,
    name: string,
    contact: string;
}
interface ICheckContactFound {
    haveWhatsApp: boolean,
    message: string;
}

export { IClient, IClientDTO, ICheckContactFound };