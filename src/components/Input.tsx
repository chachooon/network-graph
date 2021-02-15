import { css } from "@emotion/react";
import colors from "constants/colors";
import React, { useState } from "react";

export type Props = {
  /**
   * 컴포넌트의 root element(`div`)에 추가되는 className입니다.
   */
  className?: string;

  /**
   * 에러 상태를 표시합니다.
   */
  hasError?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({
  className,
  type = "text",
  hasError,
  onFocus,
  onBlur,
  ...inputAttrs
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={className}
      css={[
        css`
          position: relative;
          display: flex;
          justify-content: space-between;
          transition: background-color 0.2s ease;
          border-radius: 12px;
          align-items: center;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.02);
          font-weight: 500;
          color: ${colors.grey800};
          padding: 5px;
          height: auto;
        `,
        hasError
          ? css`
              caret-color: ${colors.red600};
              background-color: rgba(183, 28, 28, 0.05);
            `
          : null,
        isFocused
          ? css`
              background-color: rgba(25, 74, 166, 0.05);
            `
          : null,
      ]}
    >
      <input
        type={type}
        css={css`
          text-align: center;
          background-color: transparent;
          border: none;
          appearance: none;
          overflow: hidden;
          resize: none;
          box-shadow: 0;
          min-width: 0;
          width: 100%;
          min-height: 10px;
          &:focus {
            outline: 0;
          }
        `}
        {...inputAttrs}
      />
    </div>
  );
}

export default Input;
