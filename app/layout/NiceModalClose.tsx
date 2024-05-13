import NiceModal from '@ebay/nice-modal-react';
import { useLocation } from '@remix-run/react';
import { useContext, useEffect } from 'react';

export default function NiceModalClose({ children }: { children: React.ReactNode }) {
	const { pathname } = useLocation();
	const niceModalContext = useContext(NiceModal.NiceModalContext);
  
	useEffect(() => {
		Object.keys(niceModalContext).forEach((key) => {
			NiceModal.remove(key);
		});
	}, [pathname]);

	return children;
}
