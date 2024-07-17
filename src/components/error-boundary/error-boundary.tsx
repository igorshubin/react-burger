import React, {ErrorInfo, Component, ReactNode} from 'react';

import s from './styles.module.css';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';

export default class ErrorBoundary extends Component<
  {children: ReactNode; errorBody?: ReactNode},
  {error?: Error}
  > {
  state = {
    error: undefined,
  };

  static getDerivedStateFromError(error: Error) {
    return {error};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(errorInfo);
    this.setState({error});
  }

  render() {
    const {error} = this.state;
    const {errorBody} = this.props;

    if (error) {
      if (errorBody) {
        return errorBody;
      }

      return (
        <div className={s['error-boundary']}>
          <h2 className={s['error-boundary--title']}>Упс, чтото пошло не так...</h2>
          <p className={s['error-boundary--content']}>Мы уже работаем над проблемой.</p>
          <Button type={'secondary'} htmlType={'reset'} onClick={() => window.location.reload()}>
            Перегрузить страницу
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
