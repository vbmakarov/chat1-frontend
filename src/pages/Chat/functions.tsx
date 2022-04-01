import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { ImageModal } from '../../components'
import { config } from '../../config'

export const fetchAttachmentsFiles = (attachments: string[], downloadFile: (file: string) => void) => {
    const files = attachments.map((file, _) => {
        if (/(?:\.jpg|\.jpeg|\.png|\.svg)$/.test(file)) {
            if (file.split('.')[1] === 'svg') {
                return <img src={config.SERVER_URL + file} alt="emodji" width='50' height='50' />
            }
            return <ImageModal path={config.SERVER_URL + file} />

        }
        return (
            <span style={{ display: 'flex', padding: '5px 0' }}>
                <FileDownloadIcon fontSize='large' color='warning' style={{ cursor: 'pointer' }} onClick={() => downloadFile(file)} />
                {file}
            </span>
        )
    })
    return files
}