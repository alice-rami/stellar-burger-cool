import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './error-boundary.module.css';
import classNames from 'classnames';
import { textDefault, textM } from '../utils/constants-kit-styles';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log('Возникла ошибка!', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className={styles.container}>
          <h1 className={classNames(textM, 'pb-20')}>Что-то пошло не так :(</h1>
          <p className={textDefault}>
            В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
          </p>
        </section>
      );
    }
    return this.props.children;
  }
}
