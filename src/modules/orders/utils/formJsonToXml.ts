import { PipedriveDealsResponseDTO } from '../dtos/PipedriveDealsResponse.dto';

export default async (orders: Array<PipedriveDealsResponseDTO>) => {
  const xml = orders.map(
    (order) => `
    <?xml version="1.0" encoding="UTF-8"?>
    <pedido>
      <numero>${order.id}</numero>
      <cliente>
        <nome>${order.personName}</nome>
      </cliente>
      <itens>
        <item>
          <codigo>${order.id.toString()}</codigo>
          <descricao>${order.title}</descricao>
          <un>Un</un>
          <qtde>1</qtde>
          <vlr_unit>${order.value}</vlr_unit>
        </item>
      </itens>
      <parcelas>
        <parcela>
          <data>${order.date}</data>
          <vlr>${order.value}</vlr>
        </parcela>
      </parcelas>
    </pedido>`,
  );

  return xml;
};
