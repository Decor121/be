import Product from './models/Product.js';
import Combo from './models/Combo.js';
import User from './models/User.js';
import Order from './models/Order.js';
import Category from './models/Category.js';

const seedProducts = [
  // Products from HomeDecor
  {
    name: 'Khay Trà Cảnh Sắc',
    category: 'trays',
    desc: 'Họa tiết phong cảnh sơn thủy tinh tế được mài tay tỉ mỉ.',
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Mẫu bán chạy',
    price: 3200000,
    createdAt: new Date('2026-05-10'),
    code: 'AF26MT01',
    color: 'Xanh Rêu',
    colorHex: '#2d4a43',
    dimensions: '350mm x 250mm x 45mm',
    material: 'Cốt MDF chống ẩm, vẽ tay sơn mài mài láng',
    details: 'Khay đựng trà cao cấp với họa tiết phong cảnh sơn thủy tinh tế.',
    descriptionLong: 'Khay trà được hoàn thiện qua hơn 15 công đoạn sơn và mài tỉ mỉ. Bề mặt phản chiếu ánh sáng tự nhiên tạo chiều sâu không gian đặc sắc. Tác phẩm mang đậm hơi thở thiên nhiên Việt Nam được thể hiện tinh tế qua từng chi tiết mài tay.',
    characteristics: 'Họa tiết sơn thủy vẽ tay; Chống xước nhẹ; Viền bo cong mềm mại.'
  },
  {
    name: 'Bình Khảm Vỏ Trứng Tinh Hoa',
    category: 'vases',
    desc: 'Bình sơn mài nghệ thuật kết hợp vỏ trứng đập vụn tạo hoa văn độc bản.',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617791160536-598cf32026fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581781870027-04212e231e96?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Tuyệt tác',
    price: 5800000,
    createdAt: new Date('2026-05-15'),
    code: 'AF26MT02',
    color: 'Trắng Ngà',
    colorHex: '#e5dec9',
    dimensions: '180mm x 180mm x 350mm',
    material: 'Cốt gốm cao cấp, khảm vỏ trứng tự nhiên',
    details: 'Bình hoa nghệ thuật khảm vỏ trứng đập vụn tạo hoa văn độc bản.',
    descriptionLong: 'Từng mảnh vỏ trứng nhỏ được nghệ nhân đặt tay chuẩn xác lên bề mặt bình, sau đó phủ nhiều lớp sơn bóng và mài phẳng, tạo hiệu ứng đá cẩm thạch sang trọng. Sự giao thoa tinh tế đem lại nét đẹp tối giản mà đầy chiều sâu.',
    characteristics: 'Khảm vỏ trứng độc bản; Lớp phủ bóng cao cấp; Chống thấm nước tuyệt đối.'
  },
  {
    name: 'Tranh Sơn Mài Sen Vàng',
    category: 'paintings',
    desc: 'Sen hồ Tây cẩn lá vàng kim trên nền đen bóng sâu thẳm.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Độc bản',
    price: 8900000,
    createdAt: new Date('2026-05-01'),
    code: 'AF26MT03',
    color: 'Đen Huyền',
    colorHex: '#121212',
    dimensions: '600mm x 600mm x 25mm',
    material: 'Cốt gỗ ép cao cấp, dát vàng lá 18K',
    details: 'Sen hồ Tây dát vàng kim trên nền đen bóng sâu thẳm.',
    descriptionLong: 'Bức tranh thể hiện quốc hoa Việt Nam bằng ngôn ngữ sơn mài truyền thống. Lá vàng kim được dát mỏng lấp lánh tương phản mạnh mẽ với nền đen bóng huyền bí, tạo nên một không gian nghệ thuật tĩnh lặng và thanh tao.',
    characteristics: 'Dát vàng 18K cao quý; Khung gỗ tần bì chắc chắn; Phù hợp trang trí phòng khách.'
  },
  {
    name: 'Tượng Kỳ Lân Bảo Hộ',
    category: 'objects',
    desc: 'Linh vật điêu khắc tay phủ sơn mài đỏ chu sa tôn quý.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Heritage',
    price: 12500000,
    createdAt: new Date('2026-04-20'),
    code: 'AF26MT04',
    color: 'Đỏ Chu Sa',
    colorHex: '#aa2424',
    dimensions: '150mm x 200mm x 300mm',
    material: 'Gỗ trắc điêu khắc tay, phủ sơn mài chu sa',
    details: 'Linh vật điêu khắc tay tinh xảo phủ sơn mài đỏ hoàng gia.',
    descriptionLong: 'Kỳ lân được điêu khắc thủ công từ gỗ quý nguyên khối, phủ màu đỏ chu sa tôn quý kết hợp dát nhũ vàng ở các chi tiết bờm và móng, mang lại sự thịnh vượng và bảo hộ cho gia chủ.',
    characteristics: 'Điêu khắc tay 100%; Màu chu sa truyền thống Hanoia; Ý nghĩa phong thủy may mắn.'
  },
  {
    name: 'Hộp Đựng Xì Gà Khảm Trai',
    category: 'trays',
    desc: 'Bảo quản xì gà ẩm chuẩn xác trong thiết kế cẩn xà cừ đẳng cấp.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Đẳng cấp B2B',
    price: 7200000,
    createdAt: new Date('2026-05-25'),
    code: 'AF26MT05',
    color: 'Nâu Cổ Điển',
    colorHex: '#523a28',
    dimensions: '260mm x 220mm x 110mm',
    material: 'Gỗ tuyết tùng Tây Ban Nha, khảm xà cừ tự nhiên',
    details: 'Thiết kế cẩn xà cừ đẳng cấp bảo quản xì gà ẩm chuẩn xác.',
    descriptionLong: 'Sử dụng gỗ tuyết tùng Tây Ban Nha nhập khẩu cao cấp nhằm tối ưu hóa quá trình lưu trữ hương vị xì gà. Bề mặt ngoài được khảm xà cừ tự nhiên với các đường nét tinh tế đậm chất nghệ thuật Hanoia.',
    characteristics: 'Kiểm soát độ ẩm chuẩn; Khảm trai tự nhiên bóng bẩy; Bản lề đồng thau cao cấp.'
  },
  {
    name: 'Bình Hoa Thủy Triều Đỏ',
    category: 'vases',
    desc: 'Màu đỏ chu sa hòa sắc cam rực cháy lướt trên bề mặt bóng loáng.',
    image: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1617791160536-598cf32026fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581781870027-04212e231e96?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Mẫu mới',
    price: 4600000,
    createdAt: new Date('2026-05-28'),
    code: 'AF26MT06',
    color: 'Cam Đỏ',
    colorHex: '#cc4d29',
    dimensions: '160mm x 160mm x 320mm',
    material: 'Cốt composite siêu bền, phủ sơn mài nghệ thuật',
    details: 'Màu sắc thủy triều đỏ cam lướt trên bề mặt bóng loáng.',
    descriptionLong: 'Màu đỏ chu sa hòa sắc cam rực cháy chuyển sắc mượt mà lướt trên bề mặt bình hoa, tạo cảm giác chuyển động như những cơn sóng thủy triều tràn đầy năng lượng và sức sống.',
    characteristics: 'Hiệu ứng chuyển màu gradient; Thiết kế dáng bình thon gọn; Dễ lau chùi vệ sinh.'
  },

  // Unique Products from NewArrivals
  {
    name: 'Khay Trà Cúc Cổ Điển',
    category: 'trays',
    desc: 'Khay trà chữ nhật khảm xà cừ hoa cúc cổ điển, kỹ thuật mài tỉ mỉ tạo độ sâu lấp lánh phản chiếu ánh sáng tự nhiên tuyệt đẹp.',
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a814c97?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1590794056226-79ef3a814c97?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Thu Niệm',
    price: 3800000,
    createdAt: new Date('2026-05-18'),
    code: 'AF26MT07',
    color: 'Nâu Trầm',
    colorHex: '#4a3525',
    dimensions: '30cm x 42cm x 4.5cm',
    material: 'MDF cao cấp, vỏ trai tự nhiên, sơn mài bóng',
    details: 'Khay trà chữ nhật khảm xà cừ hoa cúc cổ điển.',
    descriptionLong: 'Khay trà chữ nhật khảm xà cừ hoa cúc cổ điển, kỹ thuật mài tỉ mỉ tạo độ sâu lấp lánh phản chiếu ánh sáng tự nhiên tuyệt đẹp.',
    characteristics: 'Khảm xà cừ hoa cúc; Chất liệu cao cấp; Hoàn thiện bóng gương.'
  },
  {
    name: 'Bình Hoa Mai Dát Vàng',
    category: 'vases',
    desc: 'Lấy cảm hứng từ sắc hoa mai rực rỡ của mùa xuân, bình sơn mài được dát vàng lá tinh xảo bằng tay bởi các nghệ nhân giàu kinh nghiệm tại làng nghề Hà Đông.',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Xuân Thì 2026',
    price: 5200000,
    createdAt: new Date('2026-05-19'),
    code: 'AF26MT08',
    color: 'Vàng Kim',
    colorHex: '#d4af37',
    dimensions: 'Đường kính 18cm, Chiều cao 35cm',
    material: 'Gỗ tự nhiên, sơn mài 15 lớp, dát vàng 18K',
    details: 'Bình sơn mài dát vàng lá tinh xảo bằng tay.',
    descriptionLong: 'Lấy cảm hứng từ sắc hoa mai rực rỡ của mùa xuân, bình sơn mài được dát vàng lá tinh xảo bằng tay bởi các nghệ nhân giàu kinh nghiệm tại làng nghề Hà Đông.',
    characteristics: 'Dát vàng 18K; Gỗ tự nhiên; 15 lớp sơn mài tỉ mỉ.'
  },
  {
    name: 'Hộp Trang Sức Trống Đồng',
    category: 'objects',
    desc: 'Họa tiết trống đồng Đông Sơn được cách điệu tinh tế trên nền sơn mài đỏ chu sa truyền thống. Lớp lót nhung tơ tằm mềm mại bảo vệ trang sức.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Heritage',
    price: 4500000,
    createdAt: new Date('2026-05-20'),
    code: 'AF26MT09',
    color: 'Đỏ Chu Sa',
    colorHex: '#aa2424',
    dimensions: '22cm x 15cm x 8cm',
    material: 'Sơn mài vẽ tay, lót nhung tơ tằm lụa Hà Đông',
    details: 'Họa tiết trống đồng Đông Sơn cách điệu tinh tế.',
    descriptionLong: 'Họa tiết trống đồng Đông Sơn được cách điệu tinh tế trên nền sơn mài đỏ chu sa truyền thống. Lớp lót nhung tơ tằm mềm mại bảo vệ trang sức.',
    characteristics: 'Họa tiết trống đồng Đông Sơn; Lót nhung lụa Hà Đông; Sơn mài vẽ tay.'
  },
  {
    name: 'Tranh Sơn Mài Khuê Văn Các',
    category: 'paintings',
    desc: 'Tranh sơn mài khắc họa biểu tượng Khuê Văn Các dát bạc lá tinh xảo vẽ tay.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Di Sản',
    price: 9500000,
    createdAt: new Date('2026-05-22'),
    code: 'AF26MT10',
    color: 'Đỏ Chu Sa',
    colorHex: '#aa2424',
    dimensions: '400mm x 400mm x 30mm',
    material: 'Cốt gỗ, dát bạc lá, vẽ tay mài láng',
    details: 'Tranh Khuê Văn Các dát bạc lá tôn nghiêm tinh tế.',
    descriptionLong: 'Bức tranh tôn vinh biểu tượng văn hóa lịch sử lâu đời của thủ đô Hà Nội. Được chế tác qua nhiều lớp màu sơn mài bóng mài mịn, từng nét bạc lá óng ánh tạo chiều sâu mỹ cảm đầy quý phái.',
    characteristics: 'Họa tiết Khuê Văn Các; Dát bạc lá truyền thống; Khung tranh gỗ cao cấp.'
  },
  {
    name: 'Tranh Sơn Mài Phố Cổ Hà Nội',
    category: 'paintings',
    desc: 'Bức tranh hoài niệm về Hà Nội xưa thanh bình trên cốt sơn mài mài láng.',
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Kỷ Niệm',
    price: 11000000,
    createdAt: new Date('2026-05-24'),
    code: 'AF26MT11',
    color: 'Vàng Úa',
    colorHex: '#c2a649',
    dimensions: '500mm x 700mm x 35mm',
    material: 'Gỗ ép cao cấp vẽ sơn dầu và phủ sơn mài',
    details: 'Tranh phố cổ Hà Nội hoài niệm nghệ thuật sắc nét.',
    descriptionLong: 'Tác phẩm phác họa những nếp nhà ngói xô nghiêng, gánh hàng rong mộc mạc của Hà Nội thế kỷ trước. Lớp sơn mài phủ bóng mài tay đem lại sự vĩnh cửu và bóng bẩy cho tác phẩm.',
    characteristics: 'Phố cổ Hà Nội vẽ tay; Phủ bóng sơn mài vĩnh cửu; Thích hợp làm quà tặng ngoại giao.'
  },
  {
    name: 'Hộp Trà Sơn Mài Hạt Sen',
    category: 'trays',
    desc: 'Hộp đựng trà cao cấp vẽ tay họa tiết hoa sen tao nhã trên nền sơn mài lục bảo.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Trà Chiều',
    price: 2800000,
    createdAt: new Date('2026-05-26'),
    code: 'AF26MT12',
    color: 'Xanh Lục Bảo',
    colorHex: '#0f523c',
    dimensions: '120mm x 120mm x 160mm',
    material: 'Cốt gỗ bọc sơn mài vẽ tay sơn dầu',
    details: 'Hộp trà vẽ tay hoa sen lục bảo tinh xảo.',
    descriptionLong: 'Chiếc hộp hoàn hảo bảo quản trà khô thơm mát. Họa tiết bông sen thanh tao nở rộ vẽ tay tinh tế mang hơi thở thuần khiết phương Đông.',
    characteristics: 'Nắp kín khít bảo quản trà; Vẽ tay hoa sen nghệ thuật; Nền màu lục bảo hoàng gia.'
  },
  {
    name: 'Khay Tròn Sơn Mài Mẫu Đơn',
    category: 'trays',
    desc: 'Khay tròn sơn mài khảm trai tinh tế họa sắc mẫu đơn phú quý.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Phú Quý',
    price: 3400000,
    createdAt: new Date('2026-05-27'),
    code: 'AF26MT13',
    color: 'Hồng Đen',
    colorHex: '#3d1624',
    dimensions: 'Đường kính 300mm x 30mm',
    material: 'MDF phủ sơn mài bóng khảm vỏ trai',
    details: 'Khay tròn khảm xà cừ hoa mẫu đơn cao cấp.',
    descriptionLong: 'Hoa mẫu đơn khảm trai nổi bật rực rỡ lấp lánh phản quang xà cừ nhiều sắc màu trên nền đỏ thẫm bóng láng. Khay tròn lý tưởng tiếp khách trang trọng.',
    characteristics: 'Khảm trai tự nhiên; Kiểu dáng tròn hiện đại; Chống bám bẩn dễ lau chùi.'
  },
  {
    name: 'Bình Hoa Lộc Cát',
    category: 'vases',
    desc: 'Bình hoa gốm dáng giọt nước phủ sơn mài màu đỏ chu sa rực rỡ mang tài lộc.',
    image: 'https://images.unsplash.com/photo-1581781870027-04212e231e96?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1581781870027-04212e231e96?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Tài Lộc',
    price: 6200000,
    createdAt: new Date('2026-05-23'),
    code: 'AF26MT14',
    color: 'Đỏ Hoàng Gia',
    colorHex: '#b51919',
    dimensions: '200mm x 200mm x 400mm',
    material: 'Cốt gốm Bát Tràng bọc sơn mài nghệ thuật',
    details: 'Bình hoa dáng giọt nước đỏ hoàng gia bóng bẩy.',
    descriptionLong: 'Dáng bình căng đầy thu hút vượng khí cát lành cho căn phòng. Hoàn thiện bóng gương trơn láng tôn vinh sắc đỏ chu sa Hanoia cổ điển sang trọng.',
    characteristics: 'Ý nghĩa lộc cát phát tài; Men bóng sang trọng; Dễ cắm nhiều loại hoa.'
  },
  {
    name: 'Bình Gốm Sơn Mài Dạ Minh',
    category: 'vases',
    desc: 'Bình sơn mài màu xanh đêm sâu thẳm khảm vỏ trứng loang lấp lánh như bầu trời sao.',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Dạ Minh',
    price: 7800000,
    createdAt: new Date('2026-05-25'),
    code: 'AF26MT15',
    color: 'Xanh Đêm',
    colorHex: '#0a1931',
    dimensions: '180mm x 180mm x 380mm',
    material: 'Cốt gốm, khảm vỏ trứng loang, mài phẳng láng',
    details: 'Bình khảm vỏ trứng loang sắc xanh đêm lộng lẫy.',
    descriptionLong: 'Tái hiện dải ngân hà lộng lẫy qua những vụn vỏ trứng đập nhỏ khảm chìm sâu sắc sảo trên lớp nền màu xanh lam sâu thẳm cực kỳ tinh xảo.',
    characteristics: 'Khảm vỏ trứng loang nghệ thuật; Sắc xanh lam dạ minh huyền ảo; Lớp phủ bóng chống trầy tốt.'
  },
  {
    name: 'Tượng Cá Chép Hóa Rồng',
    category: 'objects',
    desc: 'Tác phẩm điêu khắc tay gỗ trắc nguyên khối dát vàng lá 18K và phủ sơn mài chu sa.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Phồn Thịnh',
    price: 15800000,
    createdAt: new Date('2026-05-21'),
    code: 'AF26MT16',
    color: 'Đỏ Vàng',
    colorHex: '#b8860b',
    dimensions: '220mm x 180mm x 450mm',
    material: 'Gỗ trắc tự nhiên, dát vàng 18K, sơn mài láng',
    details: 'Tượng cá chép hóa rồng dát vàng 18K điêu khắc thủ công.',
    descriptionLong: 'Tác phẩm thủ công mỹ nghệ đỉnh cao mang thông điệp thăng tiến, vượt mọi nghịch cảnh hướng tới thành công rực rỡ của gia chủ. Điêu khắc chạm trổ thủ công tỉ mỉ từng lớp vảy cá chép dát vàng lấp lánh.',
    characteristics: 'Điêu khắc tay độc bản; Dát vàng 18K sang trọng; Ý nghĩa phong thủy đỗ đạt, thành công.'
  },
  {
    name: 'Đế Nến Hoàng Gia Hanoia',
    category: 'objects',
    desc: 'Chân đế nến trang trí cổ điển bọc gỗ sơn mài đen bóng viền đồng thau.',
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80'
    ],
    label: 'Hoàng Gia',
    price: 4200000,
    createdAt: new Date('2026-05-29'),
    code: 'AF26MT17',
    color: 'Đen Hoàng Kim',
    colorHex: '#1a1a1a',
    dimensions: '140mm x 140mm x 280mm',
    material: 'Đồng thau kết hợp gỗ phủ sơn mài mài láng',
    details: 'Đế nến trang trí kết hợp sơn mài đen bóng tinh xảo.',
    descriptionLong: 'Sự kết hợp hoàn mỹ giữa độ trầm ấm mịn màng của gỗ phủ sơn mài đen bóng huyền bí và độ lấp lánh lạnh lùng của đồng thau đúc chất lượng cao, đem lại điểm nhấn sang trọng cho bàn ăn hoàng gia.',
    characteristics: 'Chất liệu đồng thau đúc nặng tay; Gỗ bọc sơn mài đen bóng; Phong cách cổ điển châu Âu.'
  }
];

export async function seedDatabase() {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Clearing old collections for fresh re-seeding...');
      await Category.deleteMany({});
      await Product.deleteMany({});
      await Combo.deleteMany({});
      await Order.deleteMany({});
      
      console.log('Seeding categories...');
      const categoriesData = [
        { name: 'Khay & Hộp', slug: 'trays' },
        { name: 'Bình hoa sơn mài', slug: 'vases' },
        { name: 'Tranh sơn mài', slug: 'paintings' },
        { name: 'Đồ trưng bày', slug: 'objects' }
      ];
      const dbCategories = await Category.insertMany(categoriesData);
      
      const categoryMap = {};
      dbCategories.forEach(cat => {
        categoryMap[cat.slug] = cat._id;
      });

      console.log('Seeding products...');
      // Add random stock to products
      const seededProductsWithStock = seedProducts.map(p => ({
        ...p,
        category: categoryMap[p.category],
        stock: Math.floor(Math.random() * 50) + 1 // random stock 1-50
      }));
      
      await Product.insertMany(seededProductsWithStock);
      console.log('Successfully seeded products.');
    } else {
      console.log('Products already exist and are up to date. Skipping product seeding.');
    }

    const comboCount = await Combo.countDocuments();
    if (comboCount === 0) {
      console.log('Seeding combos...');
      
      // Fetch the created products to map them by code
      const dbProducts = await Product.find();
      const productMap = {};
      dbProducts.forEach(p => {
        productMap[p.code] = p._id;
      });

      const seedCombos = [
        {
          label: 'COMBO NGHỆ THUẬT 01',
          title: 'Bộ Sưu Tập Trà Chiều Hoàng Gia',
          desc: 'Trong lần hợp tác thứ hai cùng Hanoia, nghệ sĩ điêu khắc người Pháp - Sophie Dabet tập trung vào loạt thiết kế mang đậm hơi thở thiên nhiên Việt Nam qua bộ ba Chào mào, Vẹt và Sẻ ngô. Từ những quan sát tỉ mỉ về hình thể và chuyển động, tác giả chắt lọc đặc tính của mỗi loài rồi tái sinh chúng dưới hình hài nghệ thuật.',
          bannerImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
          quote: 'Sự giao thoa giữa nghệ thuật khảm trai truyền thống và sắc hoàng kim quý phái',
          products: [
            productMap['AF26MT07'], // Khay Trà Cúc Cổ Điển
            productMap['AF26MT08'], // Bình Hoa Mai Dát Vàng
            productMap['AF26MT09']  // Hộp Trang Sức Trống Đồng
          ].filter(Boolean)
        },
        {
          label: 'COMBO NGHỆ THUẬT 02',
          title: 'Không Gian Làm Việc Heritage',
          desc: 'Bộ quà tặng di sản đẳng cấp dành cho đối tác quan trọng, bao gồm hộp đựng xì gà khảm trai tinh tế kết hợp cùng tượng kỳ lân phong thủy phủ sơn mài đỏ chu sa tôn quý.',
          bannerImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
          quote: 'Dấu ấn di sản nâng tầm đẳng cấp không gian làm việc của gia chủ',
          products: [
            productMap['AF26MT05'], // Hộp Đựng Xì Gà Khảm Trai
            productMap['AF26MT04']  // Tượng Kỳ Lân Bảo Hộ
          ].filter(Boolean)
        }
      ];

      await Combo.insertMany(seedCombos);
      console.log('Successfully seeded combos.');
    } else {
      console.log('Combos already exist. Skipping combo seeding.');
    }

    // Seed Admin User
    let adminUser = await User.findOne({ emailOrPhone: 'admin@hanoia.com' });
    if (!adminUser) {
      console.log('Seeding admin user...');
      adminUser = new User({
        fullName: 'Admin Hanoia',
        emailOrPhone: 'admin@hanoia.com',
        password: 'admin123',
        role: 'admin'
      });
      await adminUser.save();
    }

    // Seed some mock orders if none exist
    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      console.log('Seeding mock orders...');
      const dbProducts = await Product.find().limit(5);
      
      const mockOrders = [
        {
          user: adminUser._id,
          totalAmount: 12500000,
          status: 'Delivered',
          items: [{ product: dbProducts[0]?._id, quantity: 1, price: 12500000 }]
        },
        {
          user: adminUser._id,
          totalAmount: 8900000,
          status: 'Shipped',
          items: [{ product: dbProducts[1]?._id, quantity: 1, price: 8900000 }]
        },
        {
          user: adminUser._id,
          totalAmount: 4200000,
          status: 'Processing',
          items: [{ product: dbProducts[2]?._id, quantity: 1, price: 4200000 }]
        },
        {
          user: adminUser._id,
          totalAmount: 3200000,
          status: 'Pending',
          items: [{ product: dbProducts[3]?._id, quantity: 1, price: 3200000 }]
        }
      ];
      await Order.insertMany(mockOrders);
      console.log('Successfully seeded mock orders.');
    }

  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
