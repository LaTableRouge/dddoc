export const inputFileList = () => {
  const fileInputWrappers = document.querySelectorAll('.input-wrapper--file')
  if (fileInputWrappers.length) {
    fileInputWrappers.forEach((fileInputWrapper) => {
      const input = fileInputWrapper.querySelector('input[type="file"]')
      const label = fileInputWrapper.querySelector('.file__label')
      const listFile = fileInputWrapper.querySelector('.file__list')
      const deleteButton = fileInputWrapper.querySelector('.file__delete')
      if (input && label && listFile && deleteButton) {
        // Update la liste de fichiers
        input.addEventListener('change', (e) => {
          const files = input.files
          if (files.length) {
            let string = ''
            ;[...files].forEach((file, index) => {
              string += `<li>${file.name}</li>`
            })
            listFile.innerHTML = string

            // show de la croix de suppression
            deleteButton.setAttribute('aria-hidden', 'false')
          } else {
            deleteButton.setAttribute('aria-hidden', 'true')
          }
        })

        // Supprime les fichiers sélectionnés
        deleteButton.addEventListener('click', (e) => {
          e.preventDefault()

          // hide de la croix de suppression
          deleteButton.setAttribute('aria-hidden', 'true')

          // Flush de l'input
          input.title = ''
          input.value = ''

          // Flush de la liste de fichiers
          listFile.innerHTML = ''
        })
      }
    })
  }
}
