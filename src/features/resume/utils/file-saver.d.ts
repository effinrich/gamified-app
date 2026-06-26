declare module 'file-saver' {
  const FileSaver: {
    saveAs(
      data: Blob | string | Uint8Array,
      filename?: string,
      options?: { autoBom?: boolean },
    ): void
  }
  export default FileSaver
}
