import Wizard from '@/components/adoption-wizard';
import AccessScreen from '@/components/access-screen';
import {getChatGPTUser,canAccessWizard,canMigrateLegacyDraft,chatGPTSignInPath} from '../chatgpt-auth';

export const dynamic = 'force-dynamic';

export default async function WizardPage({searchParams}) {
  const startAtBeginning = (await searchParams)?.start === '1';
  const returnTo = startAtBeginning ? '/wizard?start=1' : '/wizard';
  const user = await getChatGPTUser();
  if (!canAccessWizard(user)) return <AccessScreen user={user} signInPath={chatGPTSignInPath(returnTo)}/>;
  return <Wizard key={user.id} viewer={user} canMigrateLegacy={canMigrateLegacyDraft(user)} startAtBeginning={startAtBeginning}/>;
}
