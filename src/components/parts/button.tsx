import * as React from 'react'

declare namespace JSX {
  interface IntrinsicElements {
      button: any,
      img: any
  }
}

interface Props {
  imageSrc: string,
  imageAlt: string
}

export class Button extends React.Component<Props, null> {

  render () {
    return (
      (this.props.imageSrc) && (
        <button>
          <img src={this.props.imageSrc} alt={this.props.imageAlt} />
        </button>
      )
    )
  }
}