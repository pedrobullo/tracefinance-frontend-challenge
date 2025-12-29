"use client";

import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MaskedInputProps {
  mask: any;
  dispatch?: any;
  error?: string;
  placeholder?: string;
  value?: string;
  onAccept?: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
  scale?: number;
  radix?: string;
  thousandsSeparator?: string;
  mapToRadix?: string[];
  padFractionalZeros?: boolean;
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  function MaskedInput(
    {
      mask,
      dispatch,
      error,
      placeholder,
      value,
      onAccept,
      onBlur,
      className = "",
      disabled,
      scale,
      radix,
      thousandsSeparator,
    },
    ref
  ) {
    const containerClass = `
      flex items-center rounded-lg border bg-level-two transition-colors w-full h-14 px-4
      ${error ? "border-feedback-error-primary" : "border-border-primary"}
    `;

    const inputClass = `
      flex-1 bg-transparent font-100-light text-primary placeholder:text-disable-primary
      focus:outline-none border-0 w-full ${className}
    `;

    const maskProps: any = {
      mask,
      unmask: true,
      value: value || "",
      inputRef: ref,
      onAccept,
      onBlur,
      placeholder,
      className: inputClass,
      disabled,
    };

    if (dispatch) {
      maskProps.dispatch = dispatch;
    }

    if (mask === Number) {
      maskProps.scale = scale ?? 2;
      maskProps.radix = radix ?? ",";
      maskProps.thousandsSeparator = thousandsSeparator ?? ".";
      maskProps.min = 0;
    }

    return (
      <div className="w-full">
        <div className={containerClass}>
          <IMaskInput {...maskProps} />
        </div>
        {error && (
          <p className="mt-1 font-75-light text-feedback-error-primary">
            {error}
          </p>
        )}
      </div>
    );
  }
);

MaskedInput.displayName = "MaskedInput";
