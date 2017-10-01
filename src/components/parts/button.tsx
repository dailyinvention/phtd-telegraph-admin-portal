import * as React from 'react'

interface Props {
  imageSrc: string,
  imageAlt: string
}

export class Button extends React.Component<Props, null> {

  render() {
    return 
      { (this.props.imageSrc) &&
        <button>
          <img src={this.props.imageSrc} alt={this.props.imageAlt} />
        </button>
      }
  }
}