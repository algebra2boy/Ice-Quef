import { ManagePageDefault } from '../../views/manage_page/Default';
import { GetSampleList } from '../../models/RegisterModel';

export function ManagePageDefaultController() {
  return <ManagePageDefault ohList={GetSampleList()} />;
}
