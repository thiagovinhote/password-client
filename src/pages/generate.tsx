import {
  ClipboardIcon,
  LightningBoltIcon,
  ShieldCheckIcon
} from '@heroicons/react/outline'
import { useState } from 'react'
import { makeApiFetchGenerate } from '~/main/factories/usecases'
import { FeedbackAlert } from '~/presentation/components/Alert'
import { Scaffold } from '~/presentation/components/Scaffold'
import {
  TabsModel,
  ModeItemTab,
  MemorableForm,
  StrongForm
} from '~/presentation/organisms/generate'

const apiFetchGenerate = makeApiFetchGenerate()

const Generate: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false)

  return (
    <Scaffold title="Generate">
      <FeedbackAlert
        data={{
          title: 'Nova credencial',
          description: 'Suas credenciais foram salvas e criptografas'
        }}
        show={showAlert}
        onDismiss={() => {
          setShowAlert(false)
        }}
      />
      <h4 className="font-semibold text-md mb-2">Gerador de senhas seguras</h4>
      <TabsModel>
        <ModeItemTab
          title="Memorável"
          icon={ClipboardIcon}
          color="text-purple-400"
        >
          <MemorableForm fetchGenerate={apiFetchGenerate} />
        </ModeItemTab>
        <ModeItemTab
          title="Forte"
          icon={LightningBoltIcon}
          color="text-yellow-400"
        >
          <StrongForm fetchGenerate={apiFetchGenerate} />
        </ModeItemTab>
        <ModeItemTab
          title="Muito Forte"
          icon={ShieldCheckIcon}
          color="text-red-400"
        >
          Muito Forte
        </ModeItemTab>
      </TabsModel>
    </Scaffold>
  )
}

export default Generate
