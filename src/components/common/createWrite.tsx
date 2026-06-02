import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Asterisk, Save, Send } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const CreateWrite = () => {
  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 ">휴가 신청서 작성</h2>
        <div className="flex items-center gap-2">
          <Button variant={'outline'} size={'icon'}>
            <ArrowLeft />
          </Button>
          <Button className="w-22 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg text-sm shadow-sm hover:shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Save />
            저장
          </Button>
          <Button className="w-22 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm shadow-sm hover:shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Send />
            요청
          </Button>
        </div>
      </div>
      <form className="space-y-5">
        <div className="flex">
          <Asterisk className="text-red-600" />
          <Label>제목</Label>
        </div>
        <div>
          <Input placeholder="제목을 입력해 주세요" />
          <p className="text-[14px] text-gray-700 mt-2">홍길도 yyyy.mm.dd 휴가종류 몇일 승인 요청드립니다</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="applicant" className="text-sm font-medium text-gray-700">
            신청자
          </Label>
          <Input
            id="applicant"
            value="홍길동"
            readOnly
            className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm cursor-not-allowed outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex">
            <Asterisk className="text-red-600" />
            <Label htmlFor="vacationType" className="text-sm font-medium text-gray-700">
              휴가 종류
            </Label>
          </div>
          <Select>
            <SelectTrigger
              id="vacationType"
              className="w-full h-10 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <SelectValue placeholder="휴가 종류를 선택하세요" />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white border border-gray-200 rounded-lg shadow-md">
              <SelectGroup>
                <SelectLabel className="text-gray-400 text-xs font-semibold px-2 py-1.5">휴가 종류</SelectLabel>
                <SelectItem value="ANNUAL" className="focus:bg-blue-50 focus:text-blue-600 cursor-pointer">
                  연차
                </SelectItem>
                <SelectItem value="HALF_AM" className="focus:bg-blue-50 focus:text-blue-600 cursor-pointer">
                  오전 반차
                </SelectItem>
                <SelectItem value="HALF_PM" className="focus:bg-blue-50 focus:text-blue-600 cursor-pointer">
                  오후 반차
                </SelectItem>
                <SelectItem value="SICK" className="focus:bg-blue-50 focus:text-blue-600 cursor-pointer">
                  병가
                </SelectItem>
                <SelectItem value="EVENT" className="focus:bg-blue-50 focus:text-blue-600 cursor-pointer">
                  경조사
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex">
              <Asterisk className="text-red-600" />
              <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                시작일
              </Label>
            </div>
            <Input
              id="startDate"
              type="date"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex">
              <Asterisk className="text-red-600" />
              <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                종료일
              </Label>
            </div>
            <Input
              id="endDate"
              type="date"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="days" className="text-sm font-medium text-gray-700">
            사용 일수
          </Label>
          <Input
            id="days"
            value="3일"
            readOnly
            className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 font-semibold text-sm cursor-not-allowed outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex">
            <Asterisk className="text-red-600" />
            <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
              사유
            </Label>
          </div>
          <textarea
            id="reason"
            rows={4}
            placeholder="휴가 신청 사유를 입력해주세요."
            className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateWrite;
