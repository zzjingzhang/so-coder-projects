import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Input, Upload, message, Space, Divider, Alert } from 'antd';
import { ArrowLeftOutlined, FileTextOutlined, UploadOutlined, CheckOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { usePractice } from '../context/PracticeContext';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ImportPage = () => {
  const navigate = useNavigate();
  const { setWords } = usePractice();
  const [textInput, setTextInput] = useState('');
  const [previewWords, setPreviewWords] = useState([]);
  const [hasImported, setHasImported] = useState(false);

  const parseWords = (text) => {
    const lines = text.trim().split('\n');
    const parsed = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      const parts = trimmedLine.split(/[,，\t]/);
      if (parts.length >= 2) {
        const english = parts[0].trim().toLowerCase();
        const chinese = parts[1].trim();
        if (english && chinese && /^[a-zA-Z]+$/.test(english)) {
          parsed.push({ english, chinese });
        }
      }
    }

    return parsed;
  };

  const handleTextParse = () => {
    const parsed = parseWords(textInput);
    if (parsed.length === 0) {
      message.warning('未能解析到有效单词，请检查格式');
      return;
    }
    setPreviewWords(parsed);
    message.success(`解析到 ${parsed.length} 个单词`);
  };

  const handleExcelImport = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        const parsed = [];
        for (const row of jsonData) {
          if (row.length >= 2) {
            const english = String(row[0] || '').trim().toLowerCase();
            const chinese = String(row[1] || '').trim();
            if (english && chinese && /^[a-zA-Z]+$/.test(english)) {
              parsed.push({ english, chinese });
            }
          }
        }

        if (parsed.length === 0) {
          message.warning('未能从Excel中解析到有效单词');
          return;
        }

        setPreviewWords(parsed);
        message.success(`从Excel解析到 ${parsed.length} 个单词`);
      } catch (error) {
        message.error('解析Excel文件失败，请检查文件格式');
      }
    };
    reader.readAsArrayBuffer(file);
    return false;
  };

  const handleConfirmImport = () => {
    if (previewWords.length === 0) {
      message.warning('请先导入单词');
      return;
    }
    setWords(previewWords);
    setHasImported(true);
    message.success(`成功导入 ${previewWords.length} 个单词！`);
  };

  const handleGoToSetup = () => {
    navigate('/setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          className="mb-6"
        >
          返回首页
        </Button>

        <Card className="shadow-xl rounded-2xl border-0">
          <Title level={2} className="!text-center !text-blue-600 !mb-6">
            📝 导入单词
          </Title>

          <Alert
            message="格式说明"
            description="每行一个单词，格式为：英文单词,中文释义（英文在前，中文在后，用逗号或制表符分隔）"
            type="info"
            showIcon
            className="mb-6"
          />

          <Divider>
            <Text type="secondary">方式一：粘贴文本</Text>
          </Divider>

          <Space orientation="vertical" className="w-full" size="middle">
            <TextArea
              rows={6}
              placeholder="例如：
apple,苹果
banana,香蕉
cat,猫
dog,狗"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="text-base"
            />
            <Button
              type="primary"
              block
              icon={<FileTextOutlined />}
              onClick={handleTextParse}
              disabled={!textInput.trim()}
              className="!h-12 !text-base"
            >
              解析文本
            </Button>
          </Space>

          <Divider>
            <Text type="secondary">方式二：导入Excel</Text>
          </Divider>

          <Upload
            beforeUpload={handleExcelImport}
            accept=".xlsx,.xls,.csv"
            showUploadList={false}
          >
            <Button
              icon={<UploadOutlined />}
              className="!h-12 !text-base !w-full"
            >
              点击上传 Excel 文件（.xlsx, .xls, .csv）
            </Button>
          </Upload>

          <Text type="secondary" className="block text-center mt-2">
            Excel格式：第一列为英文单词，第二列为中文释义
          </Text>

          {previewWords.length > 0 && (
            <>
              <Divider />
              <div className="bg-gray-50 rounded-xl p-4">
                <Title level={4} className="!text-center !mb-4">
                  📋 预览 ({previewWords.length} 个单词)
                </Title>
                <div className="max-h-60 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {previewWords.map((word, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center"
                      >
                        <Text strong className="text-blue-600">{word.english}</Text>
                        <Text type="secondary">{word.chinese}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Space className="w-full justify-center mt-6" size="large">
                <Button
                  type="primary"
                  size="large"
                  icon={<CheckOutlined />}
                  onClick={handleConfirmImport}
                  className="!h-14 !text-lg !px-8"
                >
                  确认导入
                </Button>
              </Space>
            </>
          )}

          {hasImported && (
            <div className="mt-6">
              <Alert
                message="导入成功！"
                description={`已成功导入 ${previewWords.length} 个单词`}
                type="success"
                showIcon
                action={
                  <Button
                    type="primary"
                    size="small"
                    onClick={handleGoToSetup}
                  >
                    去设置练习
                  </Button>
                }
              />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ImportPage;
