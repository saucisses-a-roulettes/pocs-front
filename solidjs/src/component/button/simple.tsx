import {Component, JSX, ParentComponent} from "solid-js";


export const SimpleButton: ParentComponent<{id?: string, onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined}> = (
  props
) => {
    return (
      <button id={props.id} onClick={props.onClick}>
          {props.children}
      </button>
    );
}