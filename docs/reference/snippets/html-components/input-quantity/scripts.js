export const inputNumber = () => {
  // Evenement à écouter pour le changement (exemple : input ou change)
  const eventToListen = 'change'

  const inputNumberWrapper = document.querySelectorAll('.input-wrapper--quantity')
  if (inputNumberWrapper.length) {
    inputNumberWrapper.forEach((wrapper) => {
      const inputNumber = wrapper.querySelector('input[type="number"]')
      if (inputNumber) {
        // récupère les attributs de l'input
        const max = parseFloat(inputNumber.getAttribute('max'))
        const min = parseFloat(inputNumber.getAttribute('min'))
        const step = inputNumber.getAttribute('step')

        // setup la gestion du disable pour le min/max
        const disabledMin = inputNumber.value <= min ? 'disabled' : ''
        const disabledMax = inputNumber.value >= max ? 'disabled' : ''

        // Append du html
        const html = /* html */ `
        <div class="quantity-nav">
          <button class="quantity-button quantity-down" ${disabledMin}>-</button>
          <button class="quantity-button quantity-up" ${disabledMax}>+</button>
        </div>`
        inputNumber.insertAdjacentHTML('afterend', html)

        // Remove des events pour la touche "Entrée"
        inputNumber.addEventListener('keydown', (e) => {
          if (!e) e = event
          if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault()
            e.stopImmediatePropagation()
            e.stopPropagation()
          }
        })

        const quantityUp = wrapper.querySelector('button.quantity-up')
        const quantityDown = wrapper.querySelector('button.quantity-down')
        if (quantityUp && quantityDown) {
          // Bouton up évènements
          quantityUp.addEventListener('click', (e) => {
            e.preventDefault()

            const oldInputValue = inputNumber.valueAsNumber
            let newInputValue = 0

            if (max) {
              if (oldInputValue >= max) {
                newInputValue = oldInputValue
              } else {
                if (step) {
                  newInputValue = oldInputValue + Number(step)
                } else {
                  newInputValue = oldInputValue + 1
                }
              }
            } else {
              if (step) {
                newInputValue = oldInputValue + Number(step)
              } else {
                newInputValue = oldInputValue + 1
              }
            }

            if (newInputValue >= max) {
              quantityUp.setAttribute('disabled', '')
            } else {
              quantityUp.removeAttribute('disabled')
            }

            // set de la nouvelle valeur
            inputNumber.value = newInputValue

            // Lance l'évènement (pour le listener)
            inputNumber.dispatchEvent(new Event(eventToListen))
          })

          // Bouton down évènements
          quantityDown.addEventListener('click', (e) => {
            e.preventDefault()

            const oldInputValue = inputNumber.valueAsNumber
            let newInputValue = 0

            if (min) {
              if (oldInputValue <= min) {
                newInputValue = oldInputValue
              } else {
                if (step) {
                  newInputValue = oldInputValue - Number(step)
                } else {
                  newInputValue = oldInputValue - 1
                }
              }
            } else {
              if (step) {
                newInputValue = oldInputValue - Number(step)
              } else {
                newInputValue = oldInputValue - 1
              }
            }

            // set de la nouvelle valeur
            inputNumber.value = newInputValue

            // Lance l'évènement (pour le listener)
            inputNumber.dispatchEvent(new Event(eventToListen))
          })

          // Disable/enable les boutons & sécurité lors de l'écriture directement dans l'input
          inputNumber.addEventListener(eventToListen, (e) => {
            if (inputNumber.value >= max) {
              inputNumber.value = max
              quantityUp.setAttribute('disabled', '')
            } else {
              quantityUp.removeAttribute('disabled')
            }

            if (inputNumber.value <= min) {
              inputNumber.value = min
              quantityDown.setAttribute('disabled', '')
            } else {
              quantityDown.removeAttribute('disabled')
            }
          })
        }
      }
    })
  }
}
