import { ManagePageDefault } from '../../views/managepage/Default';
import { GetSampleList } from '../../models/OHListModel';

export function ManagePageDefaultController() {
  return <ManagePageDefault ohList={GetSampleList()} />;
}
