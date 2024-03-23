import React, { useState } from 'react';
import { GetSampleList } from '../../models/RegisterModel';
import { CalendarPageDefault } from '../../views/calendar_page/Default';

export function CalendarPageDefaultController() {
  const [registered] = useState(GetSampleList());
  return <CalendarPageDefault registered={registered} />;
}
