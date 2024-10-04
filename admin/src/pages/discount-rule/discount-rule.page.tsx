import { TableHeader } from '../../shared/ui'
import { useDiscountRuleModal } from './utils/useDiscountRuleModal.ts'
import { DiscountRuleModal } from './ui/discount-rule-modal.tsx'
import { DiscountRuleTable } from './ui/discount-rule-table.tsx'

const DiscountRulePage = () => {
	const { onOpen } = useDiscountRuleModal()
	return (
		<div>
			<TableHeader
				buttonText="Chegirma qo'shish"
				buttonClick={() => onOpen()}
				title='Chegirmalar'
			/>
			<DiscountRuleTable />
			<DiscountRuleModal />
		</div>
	)
}

export default DiscountRulePage
