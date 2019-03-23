import * as React from 'react';
import * as classnames from 'classnames';
import * as styles from './SearchInput.scss';
import Search from './svgrs/search';
import Add from './svgrs/add';

type Props = {
  value: string,
  onChange: (value: string) => void,
  onSubmit: (value: string) => void,
  placeholder: string,
  defaultValue?: string
};

type State = {
  value: string,
  editting: boolean
};

export default class Input extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { defaultValue } = props;
    this.state = {
      editting: false,
      value: defaultValue || ''
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if ('value' in nextProps && nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  inputRef = React.createRef();

  onChange = (e: any) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };

  onClick = () => {
    this.setState(
      {
        editting: true
      },
      () => {
        this.inputRef.current.focus();
      }
    );
  };

  onBlur = () => {
    this.setState({
      editting: false
    });
  };

  onFocus = () => {
    this.setState({
      editting: true
    });
  };

  onKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      if (this.props.onSubmit) {
        this.props.onSubmit(this.state.value);
      }
    }
  };

  handleClickAdd = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.value);
    }
  };

  render() {
    const cls = classnames(styles.inputWrapper, {
      [styles.showAddIcon]: this.state.value,
      [styles.showSearchIcon]: !this.state.value && !this.state.editting
    });
    return (
      <div onClick={this.onClick} className={cls}>
        <Search className={styles.searchIcon} />
        {
          <input
            type="text"
            value={this.state.value}
            ref={this.inputRef}
            onKeyUp={this.onKeyUp}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
          />
        }
        <Add className={styles.addIcon} onClick={this.handleClickAdd} />
      </div>
    );
  }
}
