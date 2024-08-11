import { ShippingServicesTable } from './ui/shipping-services-table.tsx'
import { ShippingServiceModal } from './ui/shipping-service-modal.tsx'

const ShippingServicesPage = () => {
	return (
		<div>
			<ShippingServicesTable />
			<ShippingServiceModal />
		</div>
	)
}

export default ShippingServicesPage
