import React from 'react';
import { ManagePageDefault } from '../../views/manage_page/Default';
import { LoadingPage } from '../../component/LoadingPage';
import { useOfficeHourUpdate } from '../../props/OfficeHourContext';

export function ManagePageDefaultController() {
  const { triggerUpdate, officeHour, isLoading } = useOfficeHourUpdate();

  if (isLoading) {
    return <LoadingPage text="Loading office hours..." />;
  }

  return <ManagePageDefault ohList={officeHour} />;
}
