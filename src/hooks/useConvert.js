const useConvert = () => {
  
  const arrayBufferToBase64 = buffer => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/png;base64,'+ window.btoa(binary);
  }

  return {arrayBufferToBase64}
}
 
export default useConvert;