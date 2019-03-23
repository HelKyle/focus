import * as React from 'react';
import * as classnames from 'classnames';
import * as styles from './EditableName.scss';

type Props = {
  value: string, // eslint-disable-line
  done: boolean,
  onSubmit: (value: string) => void
};

type State = {
  value: string,
  editting: boolean
};

export default class EditableLabel extends React.Component<Props, State> {
  state = {
    value: '',
    editting: false,
    tmpValue: ''
  };

  static getDerivedStateFromProps(props: Props, state) {
    return {
      ...state,
      value: props.value
    };
  }

  inputRef = React.createRef();

  onChange = (e: any) => {
    this.setState({
      tmpValue: e.target.value
    });
  };

  onClick = () => {
    this.setState(
      state => ({
        editting: true,
        tmpValue: state.value
      }),
      () => {
        this.inputRef.current.focus();
      }
    );
  };

  onBlur = () => {
    this.setState({
      editting: false
    });
    this.submitValue();
  };

  submitValue = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.tmpValue);
    }
  };

  onKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      this.submitValue();
      this.inputRef.current.blur();
    }
  };

  render() {
    const { done } = this.props;
    const { value, editting, tmpValue } = this.state;
    const valueCls = classnames(styles.display, {
      [styles.done]: done
    });
    return (
      <div onClick={this.onClick} className={styles.editableName}>
        {!editting ? (
          <p className={valueCls}>
            <span>{value}</span>
          </p>
        ) : (
          <input
            type="text"
            value={tmpValue}
            ref={this.inputRef}
            onKeyUp={this.onKeyUp}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
        )}
      </div>
    );
  }
}
