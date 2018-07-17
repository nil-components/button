import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Button extends Component {
	static propTypes = {
		type: PropTypes.string,
		size: PropTypes.string,
		htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
		className: PropTypes.string,
		inline: PropTypes.bool,
		disabled: PropTypes.bool,
		//loading: PropTypes.bool,
		iconCls: PropTypes.string,
		prefixCls: PropTypes.string,
		onClick: PropTypes.func
	};

	static defaultProps = {
		type: '',
		size: '',
		htmlType: 'button',
		className: '',
		iconCls: '',
		disabled: false,
		inline: true,
		prefixCls: 'nil-btn'
	};

	// 处理点击事件
	handleClick(event) {
		if (this.props.disabled || this.props.loading)
			return;

		if (this.props.onClick) {
			this.props.onClick(event);
		}
	}

	render() {
		const {
			prefixCls,
			htmlType,
			disabled,
			iconCls,
			type,
			size,
			inline,
			className,
			...nodeProps
		} = this.props;

		if (disabled) {
			nodeProps['disabled'] = true;
		}

		let Icon = iconCls
			? (
				<span
					className={classNames({
						[`${prefixCls}-icon`]: true,
						[iconCls]: true
					})} />
			)
			: null;

		return (
			<button
				{...nodeProps}
				type={htmlType}
				onClick={(e) => this.handleClick(e)}
				className={classNames({
					[`${prefixCls}`]: true,
					[`${prefixCls}-${type}`]: type,
					[`${prefixCls}-block`]: !inline,
					[`${prefixCls}-inline`]: inline,
					[`${prefixCls}-${size}`]: size,
					[`${prefixCls}-disabled`]: disabled,
					[className]: true
				})}>
				{Icon}
				{this.props.children
					? <span className="nex-btn-text">{this.props.children}</span>
					: null}
			</button>
		)
	}

}