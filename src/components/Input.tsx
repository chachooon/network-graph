import { css } from "@emotion/react";
import colors from "constants/colors";
import React, { useState } from "react";

function Input({
  className,
  type = "text",
  onFocus,
  onBlur,
  ...inputAttrs
}: React.InputHTMLAttributes<HTMLInputElement>) {
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
