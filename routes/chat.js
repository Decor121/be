import express from 'express';

const router = express.Router();

const SYSTEM_PROMPT = `Bạn là "Home Decor Assistant" - chuyên viên tư vấn thiết kế và trang trí nội thất không gian gia đình chuyên nghiệp, thân thiện, tinh tế của thương hiệu Home Decor.

Nhiệm vụ của bạn:
1. Tư vấn nhiệt tình cho khách hàng về giải pháp trang trí không gian gia đình (Phòng khách, Phòng ngủ, Phòng ăn & Bếp, Phòng làm việc, Ban công, Phòng tắm...).
2. Gợi ý phối màu sơn, ánh sáng, lựa chọn thảm, đèn, tranh treo tường, sofa, cây cảnh, đồ gốm decor phù hợp với từng phong cách (Hiện đại Modern, Tối giản Minimalist, Bắc Âu Scandinavian, Cổ điển, Indochine, Japandi, Wabi-sabi...).
3. Giúp tối ưu diện tích và phong thủy nhà ở một cách khoa học, trang nhã.
4. Trả lời bằng tiếng Việt, ngôn từ lịch sự, tư vấn tận tâm, súc tích (khoảng 3-6 câu hoặc danh sách gạch đầu dòng rõ ràng), truyền cảm hứng trang trí nhà cửa.
5. Xưng là "Home Decor Assistant" hoặc "Em/Tư vấn viên Home Decor" và gọi khách hàng là "Anh/Chị" hoặc "Bạn".`;

// Fallback consultant responses for offline/network issues
const getLocalFallbackReply = (userMsg) => {
  const msg = userMsg.toLowerCase();

  if (msg.includes('phòng khách') || msg.includes('sofa') || msg.includes('bàn trà')) {
    return 'Dạ, đối với phòng khách gia đình, em khuyên Anh/Chị nên tạo điểm nhấn bằng một bộ sofa chất liệu nỉ/da gam màu trung tính (kem, xám nhạt), kết hợp thảm trải sàn dệt sợi tự nhiên và đèn cây trang trí góc phòng. Thêm 1-2 bức tranh nghệ thuật khổ lớn sẽ giúp không gian vừa sang trọng vừa ấm cúng ạ!';
  }
  if (msg.includes('phòng ngủ') || msg.includes('giường') || msg.includes('ngủ')) {
    return 'Dạ, trang trí phòng ngủ nên ưu tiên sự thư thái và êm dịu ạ. Anh/Chị có thể sử dụng tông màu ấm như be, nâu gỗ mộc hoặc xanh pastel, kết hợp ánh sáng đèn vàng dịu nhẹ (3000K), chăn ga chất liệu Cotton/Linen thoáng mát và thêm nến thơm để giấc ngủ được sâu hơn.';
  }
  if (msg.includes('màu') || msg.includes('sơn') || msg.includes('phối màu')) {
    return 'Dạ, quy tắc phối màu chuẩn trong decor là 60-30-10 ạ:\n- 60% Màu chủ đạo (tường, trần): Gam màu nhạt như trắng, kem, xám nhạt.\n- 30% Màu cấp 2 (nội thất chính): Màu gỗ, sofa, rèm cửa.\n- 10% Màu điểm nhấn (gối tựa, tranh, lọ hoa): Gam màu nổi bật như vàng đồng, xanh coban hay sẫm mộc.';
  }
  if (msg.includes('nhỏ') || msg.includes('hẹp') || msg.includes('tiết kiệm diện tích')) {
    return 'Dạ với không gian diện tích khiêm tốn, giải pháp tối ưu nhất là:\n1. Tận dụng ánh sáng tự nhiên và kính/gương lớn.\n2. Chọn nội thất thông minh đa năng (giường nệm có hộc kéo, bàn gấp).\n3. Ưu tiên tông màu sáng rực rỡ và nội thất chân cao mảnh để tạo cảm giác thông thoáng.';
  }
  if (msg.includes('japandi') || msg.includes('minimalist') || msg.includes('tối giản') || msg.includes('scandinavian')) {
    return 'Dạ phong cách này rất thời thượng ạ! Japandi & Scandinavian chú trọng tính ứng dụng cao, đường nét gãy gọn, vật liệu mộc mạc như gỗ tự nhiên, mây tre, gốm thô và cây xanh. Sự tối giản giúp không gian sống luôn ngăn nắp và bình yên.';
  }

  return 'Dạ em chào Anh/Chị! Cảm ơn Anh/Chị đã liên hệ Home Decor Assistant. Anh/Chị đang muốn tư vấn trang trí không gian nào trong nhà (Phòng khách, Phòng ngủ, Bếp, Ban công) hay chọn phong cách thiết kế nào ạ? Em rất sẵn lòng hỗ trợ chi tiết ạ!';
};

// POST /api/chat
router.post('/', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Nội dung tin nhắn không được để trống.' });
    }

    const userMessage = message.trim();
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Try Gemini API if API Key is available
    if (apiKey) {
      try {
        const geminiHistory = history.map(item => ({
          role: item.sender === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }]
        }));

        const contents = [
          { role: 'user', parts: [{ text: `[HƯỚNG DẪN HỆ THỐNG]: ${SYSTEM_PROMPT}` }] },
          { role: 'model', parts: [{ text: 'Dạ, em đã hiểu rõ vai trò Home Decor Assistant. Em sẵn sàng tư vấn decor cho khách hàng ạ!' }] },
          ...geminiHistory,
          { role: 'user', parts: [{ text: userMessage }] }
        ];

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents })
        });

        if (response.ok) {
          const data = await response.json();
          const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiReply) {
            return res.json({ reply: aiReply, source: 'gemini' });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to Pollinations AI...', geminiErr.message);
      }
    }

    // 2. Try Pollinations AI Free API (No API key required)
    try {
      const formattedMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.slice(-6).map(item => ({
          role: item.sender === 'user' ? 'user' : 'assistant',
          content: item.text
        })),
        { role: 'user', content: userMessage }
      ];

      const pollResponse = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: formattedMessages,
          model: 'openai',
          seed: Math.floor(Math.random() * 1000)
        })
      });

      if (pollResponse.ok) {
        const textReply = await pollResponse.text();
        if (textReply && textReply.trim()) {
          return res.json({ reply: textReply.trim(), source: 'pollinations' });
        }
      }
    } catch (pollErr) {
      console.warn('Pollinations AI failed, using local decor knowledge engine...', pollErr.message);
    }

    // 3. Fallback to Local Decor Knowledge Engine
    const fallbackReply = getLocalFallbackReply(userMessage);
    return res.json({ reply: fallbackReply, source: 'local_fallback' });

  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({
      error: 'Có lỗi xảy ra khi xử lý yêu cầu tư vấn.',
      reply: getLocalFallbackReply(req.body?.message || '')
    });
  }
});

export default router;
