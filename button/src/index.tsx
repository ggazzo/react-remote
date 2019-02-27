/**
 * @class ExampleComponent
 */
import * as React from 'react'
import styles from './styles.css'
import { Provider } from "reakit";
import theme from "reakit-theme-default";

import { Block, Button, Backdrop, Overlay, Portal } from "reakit";


export type Props = { text: string }

export default class ExampleComponent extends React.Component<Props> {
  render() {
    const {
      text
    } = this.props

    return (
      <div className={styles.test}>
        <Provider theme={theme}>
          <Overlay.Container>
            {overlay => (
              <Block>
                <Button use={Overlay.Show} {...overlay}>Click me</Button>
                <Backdrop use={[Portal, Overlay.Hide]} {...overlay} />
                <Overlay use={Portal} {...overlay}>{text}</Overlay>
              </Block>
            )}
          </Overlay.Container>
        </Provider>
      </div>
    )
  }
}
