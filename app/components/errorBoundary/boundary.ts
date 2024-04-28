import React from 'react';

type ErrorHandler = (error: Error, info: React.ErrorInfo) => void;
type ErrorHandlingComponent<Props> = (
	props: Props,
	error?: Error,
) => React.ReactNode;

interface ErrorState {
	error?: Error;
}

export default function Catch<Props>(
	component: ErrorHandlingComponent<Props>,
	errorHandler?: ErrorHandler,
): React.ComponentType<Props> {
	return class extends React.Component<Props, ErrorState> {
		static getDerivedStateFromError(error: Error) {
			return { error };
		}

		constructor(props: Props) {
			super(props);
			this.state = { error: undefined };
		}

		componentDidCatch(error: Error, info: React.ErrorInfo) {
			if (errorHandler) {
				errorHandler(error, info);
			}
		}

		render() {
			const { error } = this.state;
			return component(this.props, error);
		}
	};
}
